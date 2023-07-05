const table = require("../../../db/blog/tableProduct");

const Create = async (req, res) => {
    console.log(req.user);
    if(req.user.ascess == true){
        try {
            const {name,categoryID} = req.body;
            const result = new table.subcategoryProdouct({
                name: name,
                categoryID : categoryID,
                subcategoryID : req.user.subcategoryID, 
            })
            await result.save()
            return res.json({"message" : "Create new subcategory already"}) 
        } catch (error) {
            res.status(500).send(error)
            console.log(error)  
        }
       
    }else{
        res.json({"message" : req.user.message,"error":true}) 
    }
}

module.exports = {Create}

