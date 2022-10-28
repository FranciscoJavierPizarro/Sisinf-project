import dbConnect from '@/models/dbConnect';
import User from '@/models/User';
import { hash } from 'bcryptjs';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting gmail and password from body
        await dbConnect();
        console.log(req.body)
        const { gmail, password, name, surname } = req.body;
        //Validate
        // if (!gmail || !gmail.includes('@') || !password) {
        //     res.status(422).json({ message: 'Invalid Data' });
        //     return;
        // }
        //Connect with database
        //Check existing
        const checkExisting = await User.find({ gmail: gmail });
        //Send error response if duplicate user is found
        // if (checkExisting) {
        //     res.status(422).json({ message: 'User already exists' });

        //     return;
        // }
        //Hash password
        const status = await User.create({
            gmail,
            name,
            surname,
            // password : "A"
            password: await hash(password, 12),
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close dbConnect connection
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
