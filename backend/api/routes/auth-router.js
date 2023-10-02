import express from 'express';


import * as authcontroller from '../controller/auth-controller.js'

const authrouter = express.Router();

console.log("in auth router")

authrouter.post("/",authcontroller.post);


export default authrouter;