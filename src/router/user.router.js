const {login, registration} = require("../controller/user.ctrl")
const router = require('express').Router();
router.post("/",login);
router.post("/register",registration)
module.exports = router