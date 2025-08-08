const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const loggerTwo = require("../middlewares/loggerTwo");
router.use(loggerTwo);

router.get("/users", getUsers);
router.get("/users/:user_id", getUserById);
router.post("/users", createUser);
router.patch("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);
module.exports = router;
