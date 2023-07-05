const {create_productValidation,update_productValidation,delete_productValidation} = require("../validation/productValidation");
function  check_createProduct(req,res,next){
    
        const data=req.body;
        // console.log("",data);
        const {error}=create_productValidation(data);
        // console.log(error)
        if(error){return res.status(400).send(error.details[0].message);}
        next()
    
    
}

function check_updateProduct(req,res,next){
        const data=req.body;
        console.log("",data);
        // console.log("",data);
        const {error}=update_productValidation(data);
        // console.log(error)
        if(error){return res.status(400).send(error.details[0].message);}
        next()
}

function check_deleteProduct(req,res,next){
        const data=req.params;
        console.log("",data);
        // console.log("",data);
        const {error}=delete_productValidation(data);
        // console.log(error)
        if(error){return res.status(400).send(error.details[0].message);}
        next()
}



module.exports = {check_createProduct,check_updateProduct,check_deleteProduct}