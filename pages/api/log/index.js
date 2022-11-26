import dbConnect from '@/models/dbConnect';
import User from '@/models/User';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting gmail and password from body
        await dbConnect();
        const data = req.body
        const user = await User.create(data)
        res.status(200).json(user)
        //Close dbConnect connection
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
