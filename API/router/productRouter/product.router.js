const createP = require("../../controller/CRUDproduct/product/createProduct");
const readP = require("../../controller/CRUDproduct/product/readProduct");
const updateP = require("../../controller/CRUDproduct/product/update_product/updateProduct");
const shop = require("../../controller/CRUDproduct/product/update_product/push_pullShop_Price");
const deleteP = require("../../controller/CRUDproduct/product/deleteProduct");

const {check_createProduct,check_updateProduct,check_deleteProduct} = require("../../middleware/productValidation/checkActivityProduct");
const {checkProductAvalibale} = require("../../middleware/productValidation/checkAvalibleProduct");
const {IncrementPID} = require("../../middleware/productValidation/AutoincrementPID");
const {upload} = require("../../middleware/productValidation/upload");
const {checkSubcategoryAvalibaleID} = require("../../middleware/productValidation/checkAvalibleSubcategoryID");
const {checkProductvalibaleID} = require("../../middleware/productValidation/checkAvalibleProductID");
const {checkPID} = require("../../middleware/productValidation/push&pull/checkPID");
const {check_pull,check_push} = require("../../middleware/productValidation/push&pull/checkActivity");
// const multer  = require('multer')
// const upload1 = multer({ dest: 'uploads/' })
// const {}

const Product = (app) => {
    app.post("/api/create_product", [check_createProduct,upload.single('file'),IncrementPID,checkProductAvalibale],createP.Create)
    app.get("/api/read_product",readP.Read)
    app.get("/api/read_product_PID/:id",readP.Read_ID)
    app.post("/api/update_product",[check_updateProduct,upload.single('file'),checkSubcategoryAvalibaleID,checkProductvalibaleID],updateP.update)
    app.post("/api/push_store",[check_push,checkPID],shop.pushshop_price)
    app.post("/api/pull_store",[check_pull,checkPID],shop.pullshop_price)
    app.post("/api/update_store",[check_pull,checkPID],shop.Updateshop_price)
    app.post("/api/delete_product/:productID",[check_deleteProduct,checkPID],deleteP.deletep)
}

module.exports = Product;