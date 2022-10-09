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
    const {id} = req.query
    const placeId = id[0]
    const userId = id[1]
    const likes = await Like.find({"placeId":placeId, "userId":userId})
    res.status(200).json(likes.map(item => cleanSchema(item)))
  }
}
