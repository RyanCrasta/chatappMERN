const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/user
router.route("/").post(registerUser);

// POST /api/user/login
router.route("/login").post(authUser);

// GET /api/user
router.route("/").get(protect, allUsers);

module.exports = router;
