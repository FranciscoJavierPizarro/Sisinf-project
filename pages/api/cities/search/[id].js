import dbConnect from '@/models/dbConnect';
import City from '@/models/City';
import { cleanSchema } from '@/lib/formater';

export default async function handler(req, res) {
  const allowedMethods = ["GET","POST", "PUT", "DELETE"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  
  await dbConnect();
  if (method === "GET") {
    const {id} = req.query
    const cities = await City.find({$text: { $search: id }})
    res.status(200).json(cleanSchema(cities))
  } 
}

