const table = require("../../../db/blog/tableProduct");

const deletec = async (req,res) => {
    try {
        if(req.user.ascess == true){
            const result = await table.categoryProdouct.deleteMany({categoryID:req.params.categoryID});
            console.log(result);
            res.json({update: true,message: "Delete Success"})
        }else{
            res.json({update: false,message: req.user.message})
        }
    } catch (error) {
        
    }
}

module.exports = {deletec} 