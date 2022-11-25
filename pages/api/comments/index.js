import dbConnect from '@/models/dbConnect';
import Comment from '@/models/Comment';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const comments = await Comment.find({})
    res.status(200).json(comments.map(item => cleanSchema(item)))
  } else if (method === "POST") {
    const data = req.body
    const comment = await Comment.create(data)
    res.status(201).json(cleanSchema(comment))
  }
}
