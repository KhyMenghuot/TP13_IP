const { string } = require("joi");
const database = require("../data/db.js");
const { Schema, model } = database;

const category = new Schema({
    name  : {type:String , unique: true},
    categoryID : {type:Number , unique: true}
 })
  
 const subcategory = new Schema({
       name: {type:String , unique: true},
       categoryID : Number,
       subcategoryID : {type:Number , unique: true}
 }) 
 
 
 const product = new Schema({
       name : {type:String , unique: true},
       subcategoryID : Number,
       productID : {type:Number , unique: true}, 
       image :String,
       store : [{
            shop : {
                  type:String
              },
            price :{
                  type:Number
              },
       }] 
 })

const categoryProdouct = database.model('Category', category)
const subcategoryProdouct = database.model("Subcategory", subcategory)
const productProdouct = database.model("Product",product)
module.exports = {categoryProdouct,subcategoryProdouct,productProdouct} 
 
