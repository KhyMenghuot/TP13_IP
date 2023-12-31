const login_api = require("../controller/CRUDinfromationUser/login.controller");
const register_api = require("../controller/CRUDinfromationUser/register.controller");
const profile = require("../controller/CRUDinfromationUser/profile.controller");
const Update_user = require("../controller/CRUDinfromationUser/update_user.controller");
const Update_passwod = require("../controller/CRUDinfromationUser/update_passwordUser.controller");
const Delete_user = require("../controller/CRUDinfromationUser/delete_user.controller");

const {check_register,check_login,check_credentail, check_password} = require("../middleware/checkActivityUser.js");
const {authorization} = require("../middleware/checkTokenUser.js");
const {update} = require("../middleware/checkUpdateUser.js");
const {check_available} = require("../middleware/checkAvailableUser.js");
const {checkuser_byUsename} = require("../middleware/checkUser_byUsername.js");


const login = (app) => {
    app.post("/api/login",[check_login,authorization],login_api.loginUser)
    app.post("/api/register",[check_register,check_credentail,check_password],register_api.registerUser)
    app.get("/api/me",authorization,profile.profileUser) 
    app.get("/api/update_user",[checkuser_byUsename,update,authorization],Update_user.updateUser) 
    app.get("/api/update_password",Update_passwod.update_password) 
    app.get("/api/delete",check_available,Delete_user.delete_user) 
    // app.get("",authorization,profile.)
}

module.exports =login;