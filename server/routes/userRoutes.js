const router = require("express").Router();
const { signup, login, setAvatar, getAllUsers } = require("../controllers/userControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post('/setAvatar/:id', setAvatar)
router.get('/allusers/:id', getAllUsers)

module.exports = router;
