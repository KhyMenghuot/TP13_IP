const table = require("../../db/blog/tableProduct");

const   checkProductAvalibale = async (req,res,next) => {

    try {
        
        let ascess;
        let message;
        if(req.counter.ascess==true){
            // console.log(req.body.subcategoryID);
            const checkID = await table.subcategoryProdouct.find({subcategoryID : req.body.subcategoryID})
            // console.log(checkID)
            if(checkID.length!=0){
                ascess = true;
                message = "ID's Subcategory have";   
            }else{
                ascess = false;
                message = "ID's Subcategory not have";
            }  
        }else{
            ascess = false;
            message = "Name's Product have already"
        }
        // console.log(req.user)
        req.user = {"ascess":ascess ,"message":message, "productID":req.counter.productIDe,"contentImage":req.image};
        console.log(req.user,"here") 
        next()
        
    } catch (error) {
        console.log(error)
    }
   
   
}  
module.exports = {checkProductAvalibale}