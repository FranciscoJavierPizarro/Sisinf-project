import dbConnect from '@/models/dbConnect';
import User from '@/models/User';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET","POST", "PUT", "DELETE"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "DELETE") {
    const {id} = req.query
    await User.deleteOne({_id: id})
    res.status(204).json()
  } else if (method === "PUT") {
    const {id} = req.query
    const {name, salt, password,gmail,admin,spam } = req.body
    const user = await User.findByIdAndUpdate(id, {name, salt, password,gmail,admin,spam }, {new: true})
    res.status(200).json(cleanSchema(user))
  } 
}

