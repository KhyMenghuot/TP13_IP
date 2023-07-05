const createS = require("../../controller/CRUDproduct/subcategory/createSubcategory");
const readS = require("../../controller/CRUDproduct/subcategory/readSubcategory");
const updateS = require("../../controller/CRUDproduct/subcategory/updateSubcategory");
const deleteS = require("../../controller/CRUDproduct/subcategory/deleteSubcategory");


const {check_createSubcategory,check_updateSubcategory,check_deleteSubcategory} = require("../../middleware/subcategoryValidation/checkActivitysubcategory");
const {checkSubcategoryAvalibale} = require("../../middleware/subcategoryValidation/checkAvalibleSubcategory");
const {getNextSequenceValue} = require("../../middleware/subcategoryValidation/AutoincrementID");
const {checkSubcategoryAvalibaleID} = require("../../middleware/subcategoryValidation/checkAvalibleSubcategoryID");
const {checkSIDAvalibale_forDelete} = require("../../middleware/subcategoryValidation/checkAvalibleSID_forDelete");
 
const {checkCategoryAvalibaleID} = require("../../middleware/categoryValidation/checkAvalibleCategoryID");
const { request } = require("express");
const Subcategory = (app) => {
    app.post("/api/create_subcategory",[check_createSubcategory,getNextSequenceValue,checkSubcategoryAvalibale],createS.Create)
    app.get("/api/read_subcategory",readS.Read)
    app.get("/api/read_subcategory_CID/:id",readS.Read_ID)
    app.post("/api/update_subcategory",[check_updateSubcategory,checkCategoryAvalibaleID,checkSubcategoryAvalibaleID],updateS.update)
    app.post("/api/delete_subcategory/:subcategoryID",[check_deleteSubcategory,checkSIDAvalibale_forDelete],deleteS.deletes)
}
module.exports = Subcategory;