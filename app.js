//Got help from Matt Forcella. Helped me work on assessment.active

const express = require("express");
const querystring = require("querystring");
const port = 3000;
const mongoose = require("mongoose")
const app = express();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
    
});
mongoose.connect("mongodb://localhost:27017/klack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: Number,
});
const Message = mongoose.model("Message", messageSchema);
// List of all messages
let messages = [];
// Track last active times for each sender
let users = {};
app.use(express.static("./public"));
app.use(express.json());
// generic comparison function for case-insensitive alphabetic sorting on the name field
function userSortFn(a, b) {
  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}
app.get("/messages", async(request, response) => {
  // get the current time
  const now = Date.now();
  // consider users active if they have connected (GET or POST) in last 15 seconds
  const requireActiveSince = now - 15 * 1000;
  messages = await Message.find()
  // create a new list of users with a flag indicating whether they have been active recently
  usersSimple = Object.keys(users).map(x => ({
    name: x,
    active: users[x] > requireActiveSince
  }));
  // sort the list of users alphabetically by name
  usersSimple.sort(userSortFn);
  usersSimple.filter(a => a.name !== request.query.for);
  // update the requesting user's last access time
  users[request.query.for] = now;
  // send the latest 40 messages and the full user list, annotated with active flags
  response.send({ messages: messages.slice(-40), users: usersSimple });
});
app.post("/messages", (request, response) => {
  // add a timestamp to each incoming message.
  const timestamp = Date.now();
  request.body.timestamp = timestamp;
  // append the new message to the message list
  //REPLACE THIS LINE WITH THIS: const newGuest = new Response(req.body);
  //messages.push(request.body);
  const messages = new Message(request.body)
  messages.save()
  // update the posting user's last access timestamp (so we know they are active)
  users[request.body.sender] = timestamp;
  // Send back the successful response.
  response.status(201);
  response.send(request.body);
});
app.listen(3000);