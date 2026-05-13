require("dotenv").config();

const pool =
require("./config/db");

const {
  sesClient,
  SendEmailCommand,
} = require("./config/ses");

const {
  sqsClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("./config/sqs");

const processMessages =
async () => {

  try {

    const command =
      new ReceiveMessageCommand({

        QueueUrl:
          process.env
            .AWS_SQS_QUEUE_URL,

        MaxNumberOfMessages: 5,

        WaitTimeSeconds: 10,

      });

    const response =
      await sqsClient.send(
        command
      );

    const messages =
      response.Messages || [];

    for (const message of messages) {

      const body =
        JSON.parse(
          message.Body
        );

      const {
        campaignId,
        contactId,
      } = body;

      const campaignResult =
        await pool.query(
          `
          SELECT *
          FROM campaigns
          WHERE id=$1
          `,
          [campaignId]
        );

      const campaign =
        campaignResult.rows[0];

      const templateResult =
        await pool.query(
          `
          SELECT *
          FROM templates
          WHERE id=$1
          `,
          [campaign.template_id]
        );

      const template =
        templateResult.rows[0];

      const contactResult =
        await pool.query(
          `
          SELECT *
          FROM contacts
          WHERE id=$1
          `,
          [contactId]
        );

      const contact =
        contactResult.rows[0];

      const params = {

        Source:
          campaign.from_email,

        Destination: {
          ToAddresses: [
            contact.email,
          ],
        },

        Message: {

          Subject: {
            Data:
              campaign.subject,
          },

          Body: {

            Html: {
              Data:
                template.html,
            },

          },

        },

      };

      const emailCommand =
        new SendEmailCommand(
          params
        );

      await sesClient.send(
        emailCommand
      );

      await pool.query(
        `
        INSERT INTO campaign_recipients
        (
          campaign_id,
          contact_id,
          status,
          sent_at
        )
        VALUES
        ($1,$2,$3,NOW())
        `,
        [
          campaignId,
          contactId,
          "sent",
        ]
      );

      await sqsClient.send(

        new DeleteMessageCommand({

          QueueUrl:
            process.env
              .AWS_SQS_QUEUE_URL,

          ReceiptHandle:
            message.ReceiptHandle,

        })

      );

      console.log(
        `Email sent to ${contact.email}`
      );
    }

  } catch (error) {

    console.log(error);

  }

  setTimeout(
    processMessages,
    5000
  );
};

processMessages();