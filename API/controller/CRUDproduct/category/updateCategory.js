const { json } = require("body-parser");
const table = require("../../../db/blog/tableProduct");
const update = async (req,res) => {
    console.log(req.body);
    
    try {
        if(req.user.ascess == true) {
            
            const result = await table.categoryProdouct.updateMany(
                {categoryID: req.body.categoryID},
                {$set:req.body}
            )
            console.log(result);
            res.json({update: true,message: "Update Success"})
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        console.log(error);
        // res.json({update: false,message: "Update not Success",error})
    }
}

module.exports = {update}