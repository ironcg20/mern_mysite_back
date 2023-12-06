// routes/user.js
const express = require("express");
const router = express.Router();

const {
  // getAllUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  singinUser,
} = require("../controllers/user");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
// router.get("/", getAllUser);
router.post("/", singinUser);
/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/create", postCreateUser);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", putUpdateUser);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id", deleteUser);

module.exports = router;
