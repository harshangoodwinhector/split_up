import * as flatservice from '../services/flat-services.js'

const setResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

// this function is used to set the error in response 
const setError = (err, response) => {
    response.status(500);
    response.json(err);
}

export const post = async (req, res) => {
	try {
        console.log("in controller")
        const user = await flatservice.save(req,res);
        //setResponse(user,res)
	} catch (error) {
		setError(error,res)
	}
}

export const get = async (req, res) => {
    try {
        const verified  = await flatservice.verify(req,res);
        //setResponse(verified,res)
        console.log(verified);
    } catch (error) {
        setError(error,res)
    }
}

export const userLogin = async (req,res) => {
    try {
        const log = await flatservice.login(req,res);
        setResponse(log,res);
        console.log(res.status);
    } catch (error) {
        setError(error,res)
    }
}
