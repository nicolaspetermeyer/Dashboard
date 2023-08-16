require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root.js"));
app.use("/data", require("./routes/dataRoutes.js"));

//---- Message API ----
//---- POST ----
const messages = [];
app.post('/api/messages', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required.'});
  }

  const newMessage = {
    id: messages.length+1,
    content,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);

  res.status(201).json(newMessage)
})

//---- GET ----
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

//---- DELETE -----
app.post('/api/messages/delete', (req, res) => {
  messages.length = 0; // Clear the messages array
  res.json({ message: 'Messages cleared successfully' });
});

//---- Favorite API ----
//---- POST ----
const favorite = [];
app.post('/api/favorite', (req, res) => {
  const { favorite: newFavorite } = req.body;
  console.log(res)
  // if (!newFavorite || !newFavorite.url) {
  //   return res.status(400).json({ error: 'invalid data.'});
  // }
  favorite.push(newFavorite);

  res.status(201).json(newFavorite)
})

//---- GET ----
app.get('/api/favorite', (req, res) => {
  res.json(favorite);
});


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Atlas");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
