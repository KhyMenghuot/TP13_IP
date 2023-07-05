const {create_subcategoryValidation,update_subcategoryValidation,delete_subcategoryValidation} = require("../validation/subcategoryValidation");

function check_createSubcategory(req,res,next){
    const data=req.body;
    const {error}=create_subcategoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}
function check_updateSubcategory(req,res,next){
    console.log(req.body);
    const data=req.body;
    const {error}=update_subcategoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_deleteSubcategory(req,res,next){
    console.log(req.params,"this");
    const data=req.params;
    const {error}=delete_subcategoryValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

module.exports = {check_createSubcategory,check_updateSubcategory,check_deleteSubcategory,}