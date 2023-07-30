require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");
const socket = require('socket.io')

app.use(express.json());
app.use(cors({
    origin: 'https://chat-hub-frontend.vercel.app',
    credentials: true,
  }));

mongoose
.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB connection successful!") 
})
.catch((error) => console.log(error.message));

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: 'https://chat-hub-frontend.vercel.app',
    credentials: true,
  },
    rejectUnauthorized: false
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  socket.on('send-msg', (data) => {
    // console.log('sendmsg', {data})
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit('msg-receive', data.msg)
    }
  })
})
