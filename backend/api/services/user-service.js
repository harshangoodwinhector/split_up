import { User}from "../models/User.js";
import bcrypt  from 'bcrypt'
import mongoose from "mongoose";
import {validate,login_validate} from '../models/User.js'
import {Token }from "../models/token.js";
import {Flat} from "../models/flat.js";
import { tracking } from "../models/tracking.js";
import { expense } from "../models/expense.js";

export const save = async (req,res) => {
    let saved = null
    //console.log(req.body)
    const { error } = validate(req.body);
    console.log("error")
		if (error){
            console.log("error");
			res.status(400);
            saved = { message: error.details[0].message }
            return saved
        }

		const user = await User.findOne({ email: req.body.email });
		if (user) {
            console.log("in exist");
			 res.status(409)
             saved = { message: "User with given email already Exist!" };
             return saved
        }
        const use = req.body
		 const salt = await bcrypt.genSalt(10);
        // console.log(salt);
		 const hashPassword = await bcrypt.hash( use.password, salt);
        
        use.password = hashPassword
        console.log(use.password)

       const flat = await Flat.findOne({_id:req.params.id});
     
        
        use.flatId = mongoose.Types.ObjectId(req.params.id);
        const newUser = new User(use);
         saved =   await newUser.save();

        

        console.log(saved);
        let users = flat.User
        console.log(saved._id);
        users.push(saved._id);
        flat.User = users;
        console.log("44--------",flat);
       await Flat.findOneAndUpdate({_id:req.params.id},flat);
       console.log("No error");
		res.status(201);
        return saved;
}

export const verify = async (req,res) => {
    console.log(req.params )
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
		if (!user) return res.status(400).send({ message: "Invalid link" });

        const query={
            userId: user._id,
			token: req.params.token
        }
        console.log(query);
		const token = await Token.findOne(query);
        console.log(token);
		if (!token) return res.status(400).send({ message: "Invalid link" });

		//await User.updateOne({ _id: user._id, verified: true });
        const filter = { _id: user._id};
        const update = {verified: true };
        User.findOneAndUpdate(filter,update,{
            new: true
        }).exec();
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });    

}

export const fetchUser = async (req,res) => {

    console.log("in service")
    console.log(mongoose.Types.ObjectId(req.params.id))
    let users = User.find({flatId:mongoose.Types.ObjectId(req.params.id) });
    res.status(200);
    return users;
}

export const userLogin = async (req,res) => {
    console.log("in user login");
    // const { error } = login_validate(req.body);
	// 	if (error){
    //         console.log("in error")
	// 		return res.status(400).send({ message: error.details[0].message });
    //     }

    const user =  await User.findOne({ firstName: req.body.firstName }).exec();
        console.log(req.body);
        
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
    console.log("111u11====\n",user);
    res.status(200);
    return user;

}

export const update_profile = async(req,res) => {
    const updated = User.findOneAndUpdate({_id:req.params.id},req.body,{
        new: true
    }).exec()
    return updated
}

export const delete_profile = async(req,res) => {
    const deleted = await User.findOneAndDelete({_id:req.params.id}).exec();
    await tracking.findOneAndDelete({_user_id:req.params.id});
    await expense.findOneAndDelete({_user_id:req.params.id});

    return deleted;
}



