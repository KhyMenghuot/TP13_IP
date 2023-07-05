const table  = require("../../db/blog/tableProduct");

const checkCategoryAvalibale = async(req,res,next) => {
    const result = await table.categoryProdouct.find({name : req.body.name})
    let ascess;
    let message;
    console.log(result.length)
    if(result.length==0){
        const checkID = await table.categoryProdouct.find({categoryID : req.body.categoryID})
        if(checkID.length==0){
            ascess = true;
            message = "ID not exit";
            
        }else{
            ascess = false;
            message = "ID have already";
        }
        
    }else{
        ascess = false;
        message = "Name's Category have already"
    }
    req.user = {"ascess":ascess ,"message":message};
    next()
   
    
}
module.exports = {checkCategoryAvalibale}