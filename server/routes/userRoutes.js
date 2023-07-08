const router = require("express").Router();
const { signup, login, setAvatar } = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post('/setAvatar/:id', setAvatar)

module.exports = router;
