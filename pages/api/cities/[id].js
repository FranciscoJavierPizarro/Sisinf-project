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
    const city = await City.findById(id)
    res.status(200).json(cleanSchema(city))
  } else if (method === "DELETE") {
    const {id} = req.query
    await City.deleteOne({_id: id})
    res.status(204).json()
  }
  else if (method === "PUT") {//actualizar campos por los de city y no places
    const {id} = req.query
    const {name, descp, publisherId,publishingDate,cityId,Validacion } = req.body
    const city = await City.findByIdAndUpdate(id, {name, descp, publisherId,publishingDate,cityId,Validacion}, {new: true})
    res.status(200).json(cleanSchema(city))
  } 
}

