const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

// create or fetching one on one chat
router.route("/").post(protect, accessChat);

router.route("/").get(protect, fetchChats);

router.route("/group").post(protect, createGroupChat);

router.route("/rename").put(protect, renameGroup);

// remove someone from group
router.route("/groupdremove").put(protect, removeFromGroup);

// add someone to group
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
