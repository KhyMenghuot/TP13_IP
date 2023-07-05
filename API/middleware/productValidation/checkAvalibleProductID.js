const table = require("../../db/blog/tableProduct");

const checkProductvalibaleID = (req,res,next) => {
    console.log(req.body);
    let ascess;
    let message;
    if(req.user.ascess==true){
        const result = table.productProdouct.findOne({productID: req.body.productID});
        if(result.length!=0) {
            message = "";
            ascess = true
        }else{
            ascess = false
            message = "ID's Product incorrect";
        }
    }else{
        ascess = req.user.ascess;
        message = req.user.message;
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
}
module.exports = {checkProductvalibaleID}