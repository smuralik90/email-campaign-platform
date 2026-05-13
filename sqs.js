const {
    SQSClient,
    SendMessageCommand,
    ReceiveMessageCommand,
    DeleteMessageCommand,
  } = require("@aws-sdk/client-sqs");
  
  const sqsClient =
    new SQSClient({
  
      region:
        process.env.AWS_REGION,
  
      credentials: {
  
        accessKeyId:
          process.env
            .AWS_ACCESS_KEY_ID,
  
        secretAccessKey:
          process.env
            .AWS_SECRET_ACCESS_KEY,
      },
  
    });
  
  module.exports = {
    sqsClient,
    SendMessageCommand,
    ReceiveMessageCommand,
    DeleteMessageCommand,
  };