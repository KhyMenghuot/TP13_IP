const table = require("../../../db/blog/tableProduct");

const deletes = async (req,res) => {
    try {
        console.log(req.params.subcategoryID);
        if(req.user.ascess == true){
            const result = await table.subcategoryProdouct.deleteMany({subcategoryID:req.params.subcategoryID});
            console.log(result);
            res.json({update: true,message: "Delete Success"})
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        res.json({update: true,message: "Delete not Success"})
    }
}

module.exports = {deletes} 