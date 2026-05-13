const pool = require("../config/db");

const {
  sesClient,
  SendEmailCommand,
} = require("../config/ses");

const {
  sqsClient,
  SendMessageCommand,
} = require("../config/sqs");

const createCampaign =
async (req, res) => {

  try {

    const {
      name,
      subject,
      preview_text,
      from_name,
      from_email,
      template_id,
    } = req.body;

    const result =
      await pool.query(
        `
        INSERT INTO campaigns
        (
          name,
          subject,
          preview_text,
          from_name,
          from_email,
          template_id
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
          name,
          subject,
          preview_text,
          from_name,
          from_email,
          template_id,
        ]
      );

    res.status(201).json({
      message:
        "Campaign created",
      campaign:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

const getCampaigns =
async (req, res) => {

  try {

    const result =
      await pool.query(
        `
        SELECT *
        FROM campaigns
        ORDER BY id DESC
        `
      );

    res.json(
      result.rows
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

const sendCampaign =
async (req, res) => {

  try {

    const { id } = req.params;

    const contactsResult =
      await pool.query(
        `
        SELECT *
        FROM contacts
        WHERE status='active'
        `
      );

    const contacts =
      contactsResult.rows;

    for (const contact of contacts) {

      const messageBody =
        JSON.stringify({
          campaignId: id,
          contactId: contact.id,
        });

      const command =
        new SendMessageCommand({

          QueueUrl:
            process.env
              .AWS_SQS_QUEUE_URL,

          MessageBody:
            messageBody,

        });

      await sqsClient.send(
        command
      );

    }

    await pool.query(
      `
      UPDATE campaigns
      SET status='sending'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      message:
        "Campaign queued",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Queue failed",
    });

  }

};

const scheduleCampaign =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      scheduled_at,
    } = req.body;

    await pool.query(
      `
      UPDATE campaigns
      SET
      status='scheduled',
      scheduled_at=$1
      WHERE id=$2
      `,
      [
        scheduled_at,
        id,
      ]
    );

    res.json({
      message:
        "Campaign scheduled",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Schedule failed",
    });

  }

};

const getCampaignProgress =
async (req, res) => {

  try {

    const { id } = req.params;

    const totalResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM contacts
        WHERE status='active'
        `
      );

    const sentResult =
      await pool.query(
        `
        SELECT COUNT(*)
        FROM campaign_recipients
        WHERE
        campaign_id=$1
        `,
        [id]
      );

    res.json({

      total:
        totalResult.rows[0].count,

      sent:
        sentResult.rows[0].count,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Progress failed",
    });

  }

};

const trackOpen = async (req, res) => {

  try {

    const { campaignId, contactId } =
      req.params;

    await pool.query(
      `
      INSERT INTO campaign_events
      (
        campaign_id,
        contact_id,
        event_type
      )
      VALUES
      ($1,$2,$3)
      `,
      [
        campaignId,
        contactId,
        "open",
      ]
    );

    res.set("Content-Type", "image/gif");

    return res.send(
      Buffer.from(
        "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        "base64"
      )
    );

  } catch (error) {

    console.log(error);

  }

};

module.exports = {
  createCampaign,
  getCampaigns,
  sendCampaign,
  scheduleCampaign,
  getCampaignProgress,
  trackOpen,
};