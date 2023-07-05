const table = require("../../db/blog/tableProduct");

const checkSubcategoryAvalibale = async (req,res,next) => {

    try {
        const result = await table.subcategoryProdouct.find({name : req.body.name})
        let ascess;
        let message;
        console.log(result.length)
        if(result.length==0){
            const checkID = await table.categoryProdouct.find({categoryID : req.body.categoryID})
            if(checkID.length!=0){
                ascess = true;
                message = "ID's Category have";   
            }else{
                ascess = false;
                message = "ID's Category not have";
            }  
        }else{
            ascess = false;
            message = "Name's Category have already"
        }
        console.log(req.user)
        req.user = {"ascess":ascess ,"message":message, "subcategoryID":req.user.subcategoryID};
        console.log(req.user) 
        next()
        
    } catch (error) {
        console.log(error)
    }
   
   
}  

module.exports = {checkSubcategoryAvalibale}