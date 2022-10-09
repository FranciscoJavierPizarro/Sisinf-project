import dbConnect from '@/models/dbConnect';
import Like from '@/models/Like';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST", "DELETE"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const likes = await Like.find({})
    res.status(200).json(likes.map(item => cleanSchema(item)))
  } else if (method === "POST") {
    const data = req.body
    const like = await Like.create(data)
    res.status(201).json(cleanSchema(like))
  } else if (method === "DELETE") {
    const {placeId,userId} = req.body
    await Like.deleteOne({placeId: placeId,userId: userId})
    res.status(204).json()
  }
}
