
const {pushValidation,pullValidation} = require("../../validation/productValidation");

function check_push(req,res,next){
    const data=req.body;
    console.log("",data);
    // console.log("",data);
    const {error}=pushValidation(data);
    // console.log(error)
    if(error){return res.status(400).send(error.details[0].message);}
    next()
}

function check_pull(req,res,next){
    const data=req.body;
    console.log("",data);
    // console.log("",data);
    const {error}=pullValidation(data);
    // console.log(error)
    if(error){return res.status(400).send(error.details[0].message);}
    next()
}


module.exports = {check_pull,check_push}
