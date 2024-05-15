const express = require("express");
const { chats } = require("./dummy-data/dummydata");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(express.json()); // to accept JSON data

connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => {
    if (chat._id === req.params.id) {
      return true;
    }
    return false;
  });

  res.send(singleChat);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port 5000", process.env.PORT);
});
