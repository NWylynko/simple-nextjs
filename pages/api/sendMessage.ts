import type { NextApiRequest, NextApiResponse } from 'next'
const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const topicName = 'simple-web-app';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { message } = req.body;

  await publishMessage(JSON.stringify({ message }))

  res.json({ message })
}

async function publishMessage(data: string) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
}