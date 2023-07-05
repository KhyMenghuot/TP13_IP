
const table = require("../../../db/blog/tableProduct");
const update = async (req,res) => {
    try {
        if(req.user.ascess == true) {
            
            const result = await table.subcategoryProdouct.updateMany(
                {subcategoryID: req.body.subcategoryID},
                {$set:req.body}
            )
            console.log(result);
            if(result.modifiedCount != 0){
                res.json({update: true,message: "Update Success"})
            }else{
                res.json({update: false,message: "Update not Success"})
            }
            
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        console.log(error);
        // res.json({update: false,message: "Update not Success",error})
    }
}

module.exports = {update}