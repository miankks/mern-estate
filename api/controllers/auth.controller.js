import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    console.log(req.body)
    const { username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('user created successfully');
    } catch (error) {
        // res.status(500).json(error)
        // next(errorhandler(550, 'Error from the function'));      
        next(error);  
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorhandler(404, 'User not found!'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorhandler(401, 'Wrong credentials'))
        }
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc;
        // res.cookie('access_token', token, { httpOnly: true}).status(200).json(validUser);
        res.cookie('access_token', token, { httpOnly: true}).status(200).json(rest); // not to send password
    } catch (error) {
        next(error)
    }

}