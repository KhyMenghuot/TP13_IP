const createC = require("../../controller/CRUDproduct/category/createCategory");
const readC = require("../../controller/CRUDproduct/category/readCategory");
const updateC = require("../../controller/CRUDproduct/category/updateCategory");
const deleteC = require("../../controller/CRUDproduct/category/deleteCategory");

const {check_createCategory,check_updateCategory,check_deleteCategory} = require("../../middleware/categoryValidation/checkActivitycategoty");
const {checkCategoryAvalibale} = require("../../middleware/categoryValidation/checkAvalibleCategory");
const {checkCategoryAvalibaleID} =require("../../middleware/categoryValidation/checkAvalibleCategoryID");

const Category = (app) => {
    app.post("/api/create_category",check_createCategory,checkCategoryAvalibale,createC.Create)
    app.get("/api/read_category",readC.Read)
    app.get("/api/read_categoryID",readC.ReadID)
    app.post("/api/update_category",check_updateCategory,checkCategoryAvalibaleID,updateC.update)
    app.delete("/api/delete_categoty/:categoryID",check_deleteCategory,checkCategoryAvalibaleID,deleteC.deletec)
}   

module.exports = Category