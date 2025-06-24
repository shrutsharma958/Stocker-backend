const { Signup } = require("../Controllers/AuthController");
const {Login}= require("../Controllers/AuthController");
const {userVerification}=require("../Middlewares/AuthMiddleware")
const router = require("express").Router();

router.post('/',userVerification)

router.post('/login', Login);
router.post("/signup", Signup);


module.exports = router;