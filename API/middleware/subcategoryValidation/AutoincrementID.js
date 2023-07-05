const table = require("../../db/blog/tableProduct");
const  getNextSequenceValue =  async(req,res,next) => {
    try {
        const sequenceDocument = await table.subcategoryProdouct.find({
            name: req.body.name 
        });
        console.log(sequenceDocument.length);
        if(sequenceDocument.length==0){
            const counter = await table.subcategoryProdouct.find({
            });
           
            if(counter.length==0){
                req.user = {"subcategoryID" : 1 }
            }else{
              
                req.user = {"subcategoryID":counter[counter.length-1].subcategoryID+1}
            }
            
        }else{
            res.json({message : "Name's Subcategory have already"})
        }
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
    }
   
}
module.exports = {getNextSequenceValue}