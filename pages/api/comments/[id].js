import dbConnect from '@/models/dbConnect';
import Comment from '@/models/Comment';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const {id} = req.query
    const comments = await Comment.find({"placeId":id})
    res.status(200).json(comments.map(item => cleanSchema(item)))
  }
}
