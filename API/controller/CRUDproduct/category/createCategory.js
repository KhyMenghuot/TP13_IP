
const tableCategory = require("../../../db/blog/tableProduct.js");
console.log(tableCategory);
const table  = tableCategory.categoryProdouct

const Create = async (req,res) => {
    console.log(req.user.ascess);
    let message = req.user.message;
    console.log(message);
    if(req.user.ascess == true){
        try {
            const {categoryID,name} = req.body;
            const result = new table({
                categoryID:categoryID,
                name:name,
            })
            await result.save()
            return res.json({"message" : "Create new category already"}) 
        } catch (error) {
            res.status(405).send(error)
        }
    }else{
        res.json({"message" : message}) 
    }
        
}
 
module.exports = {Create}

