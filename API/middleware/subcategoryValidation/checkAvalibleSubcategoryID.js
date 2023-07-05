const table  = require("../../db/blog/tableProduct");

const checkSubcategoryAvalibaleID = async(req,res,next) => {
    const result = await table.subcategoryProdouct.find({subcategoryID: req.body.subcategoryID})
    let ascess;
    let message;
    console.log(result.length)
    console.log(req.user)
    if(req.user.ascess == true){
        if(result.length==1){
            ascess = true;
            message = "";
        }else{
            ascess = false;
            message = "ID's Subcategory incorrect"
        }
    }else{
        ascess = req.user.ascess;
        message = req.user.message;
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
  
}
module.exports = {checkSubcategoryAvalibaleID}