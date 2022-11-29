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
    const query = req.body
    const user = await User.findOne({"gmail": query.username})
    res.status(200).json(user)
  } else if (req.method === 'GET') {
    const users = await User.find({})
    res.status(200).json(users.map(item => cleanSchema(item)))
  }
}
