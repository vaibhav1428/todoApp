const express = require("express");
const authRouter = require("./auth.routes");
const todoRouter = require("./todo.routes");
const checkHeaders = require("../../middlewares/checkHeader");
const router = express.Router();

router.use("/auth",authRouter );
router.use("/",checkHeaders,todoRouter );


module.exports = router;
