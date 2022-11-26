import dbConnect from '@/models/dbConnect';
import User from '@/models/User';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET", "POST", "DELETE"]
  const method = req.method
  
  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "POST") {
    const query = JSON.parse(req.body)
    console.log(query)
    const user = await User.find({"gmail":query.gmail})
    console.log(user)
    res.status(200).json(user)
  }
}
