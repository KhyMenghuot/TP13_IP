const table  = require("../../db/blog/tableProduct");

const checkCategoryAvalibaleID = async(req,res,next) => {
    let result;
    if(req.params.categoryID) {
         result = await table.categoryProdouct.find({categoryID: req.params.categoryID})
    }else{
        result = await table.categoryProdouct.find({categoryID: req.body.categoryID})
    }
    
    let ascess;
    let message;
    console.log("cID",result.length)
    if(result.length==1){
        ascess = true;
        message = "";
    }else{
        ascess = false;
        message = "ID's Category incorrect"
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
}
module.exports = {checkCategoryAvalibaleID}