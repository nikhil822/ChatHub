const router = require("express").Router();
const { signup } = require("../controllers/userControllers");

router.post("/signup", signup);

module.exports = router;
