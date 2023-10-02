import express from 'express';
import * as resetpasswordcontroller from'./../controller/resetpassword-controller.js'
const resetrouter = express.Router();

resetrouter.post("/",resetpasswordcontroller.post);
resetrouter.get("/:id/:token",resetpasswordcontroller.get);
resetrouter.post("/:id/:token",resetpasswordcontroller.newpassword);
resetrouter.post("/child",resetpasswordcontroller.postChild);
resetrouter.get("/child/:id/:token",resetpasswordcontroller.getChild);
resetrouter.post("/child/:id/:token",resetpasswordcontroller.newpasswordChild);

export default resetrouter; 