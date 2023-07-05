
const {create_categoryValidation,update_categoryValidation,delete_categoryValidation} = require("../validation/categoryValidation.js");

function check_createCategory(req,res,next){
    const data=req.body;
    const {error}=create_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_updateCategory(req,res,next){
    let data;
    console.log(req.params);
    if(req.body.categoryID!==0){
        data = req.body;
    }else{
        data = req.params;
    }
    
    const {error}=update_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_deleteCategory(req,res,next){
    console.log(req.params);
    const data=req.params;
    const {error}=delete_categoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}
module.exports = {check_createCategory,check_updateCategory,check_deleteCategory}