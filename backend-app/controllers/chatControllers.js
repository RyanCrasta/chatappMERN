const asyncHandler = require("express-async-handler");
const Chats = require("../models/chatModel");
const Users = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { toUserId } = req.body;

  if (!toUserId) {
    console.log("to user id param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chats.find({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: { $eq: req.user._id }, // current user
        },
      },
      {
        users: {
          $elemMatch: { $eq: toUserId }, // user whom current user wanna talk
        },
      },
    ],
  })
    .populate("users", "-password") // they contain only id but we want more info so use populate
    .populate("latestMessage");

  console.log("isChat one", isChat);

  isChat = await Users.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  console.log("isChat two", JSON.stringify(isChat));

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, toUserId],
    };

    try {
      const createdChat = await Chats.create(chatData);
      const fullChat = await Chats.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      console.log("fullChat one", fullChat);

      res.status(200).send(fullChat);
    } catch (err) {
      throw new Error(err.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chats.find({
      users: {
        $elemMatch: { $eq: req.user._id },
      },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        // results = await User.populate(results, {
        //     path: "latestMessage.sender",
        //     select: "name pic email",
        //   });

        res.status(200).send(result);
      });
  } catch (e) {}
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({
      message: "Please fill all the fields",
    });
  }

  let users = req.body.users && JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("more than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    let groupChatData = {
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    };
    const groupChatInfo = await Chats.create(groupChatData);

    const fullGroupChat = await Chats.findOne({
      _id: groupChatInfo._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedGroupName = await Chats.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedGroupName) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updatedGroupName);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chats.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chats.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
