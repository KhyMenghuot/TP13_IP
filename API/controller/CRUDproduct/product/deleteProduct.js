const table = require("../../../db/blog/tableProduct");

const deletep = async (req,res) => {
    try {
        if(req.user.ascess == true){
            const result = await table.productProdouct.deleteMany({productID:req.params.productID});
            console.log(result);
            res.json({update: true,message: "Delete Success"})
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        res.json({update: true,message: "Delete not Success"})
    }
}

module.exports = {deletep} 