const table = require("../../../db/blog/tableProduct");

const Read = async(req,res) => {

    try {
        const filter = {}
        let result = table.categoryProdouct.find(filter).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error)
        });
        console.log(result.then(result[0]));
    } catch (error) {
        res.status(0).send(error);  
    }
    
}

const ReadID = async(req,res) => {
    try {
        console.log(req.body)
        let result = table.categoryProdouct.find({categoryID:req.body.categoryID}).then((result) =>{
            res.send(result)    
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {Read,ReadID}