
import bcrypt  from 'bcrypt'
import { Flat } from '../models/flat.js';
import {validate,login_validate} from '../models/flat.js'
import {Token }from "../models/token.js";

export const save = async (req,res) => {
    console.log("in service")
    //console.log(req.body)
    const { error } = validate(req.body);
  //  console.log("error")
		if (error){
            
            console.log("error");
            console.log(error);
			return res.status(400).send({ message: error.details[0].message });
        }

		const user = await Flat.findOne({ email: req.body.email });
		if (user) {
            console.log("in exist")
			return res
				.status(409)
				.send({ message: "Flat with given email already Exist!" });
        }
        const use = req.body
		 const salt = await bcrypt.genSalt(10);
        // console.log(salt);
		 const hashPassword = await bcrypt.hash( use.password, salt);
        
        use.password = hashPassword
        //console.log(use.password)
        const newUser = new Flat(use);
        newUser.save();
		res.status(201).send({ message: "Flat created successfully" });
        return res;
} 

export const verify = async (req,res) => {
    console.log(req.params )
    const user = await Flat.findOne({ _id: req.params.id });
    console.log(user);
		if (!user) return res.status(400).send({ message: "Invalid link" });

        const query={
            userId: user._id,
			token: req.params.token
        }
        console.log(query)
		const token = await Token.findOne(query);
        console.log(token)
		if (!token) return res.status(400).send({ message: "Invalid link" });

		//await User.updateOne({ _id: user._id, verified: true });
        const filter = { _id: user._id};
        const update = {verified: true };
        await Flat.findOneAndUpdate(filter,update,{
            new: true
        }).exec();
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });    

}

export const login = async (req,res) => {
    const { error } = login_validate(req.body);
		if (error){
            console.log("in error")
			return res.status(400).send({ message: error.details[0].message });
        }
       console.log(req.body);
		const user =  await Flat.findOne({ email: req.body.email }).exec();
        
        
		if (!user){
			return res.status(401);
    }

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
			return res.status(401);
        }

        //res.status(200).send({ message: "Flat user login successfully" });
        return user;


}
