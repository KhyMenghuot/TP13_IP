const express = require("express");
const app = express();
const router = express.Router();
const path = require("path"); // The Path module provides a way of working with directories and file paths.
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(express.text())

app.use(express.json()) // user json packge in express
app.use(cookieParser()) 
app.use(router)

app.use(cors("*"))
app.use('/static',express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set("view engine", "ejs");

require("./router/user.router")(app);
require("./router/productRouter/category.router")(app);
require("./router/productRouter/subcategory.router")(app);
require("./router/productRouter/product.router")(app);

app.use('/static',express.static(path.join(__dirname, "/image"))); // return file from image directory and /static is middleware 
const port = 8080;
app.listen(port, () => {
    console.log("http://localhost: "+ port);
})  