const table = require("../../../db/blog/tableProduct");

const checkPID = async (req,res,next) => {
    let result;
    console.log(req.body,"hear");
    if(req.params.productID) {
        console.log("this1")
        result = await table.productProdouct.find({productID: req.params.productID})
   }else{
   
       result = await table.productProdouct.find({productID: req.body.productID})
   }
    console.log(result)
    if(result.length!=0) {
        message = "";
        ascess = true
    }else{
        ascess = false
        message = "ID's Product incorrect";
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
}
module.exports = {checkPID}