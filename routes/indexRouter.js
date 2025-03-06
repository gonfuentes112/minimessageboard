const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/new", (req, res) => {
    res.render("form");
  });
  
indexRouter.post("/new", (req, res) => {
    const newName = req.body.username;
    const newText = req.body.messagetext;
    messages.push({text: newText, user: newName, added: new Date()})
    res.redirect("/")
});

indexRouter.get("/messages/:messageid", (req, res) => {
    const messageid = req.params.messageid;
    res.render("messagedetail", {message: messages[messageid]})
})

module.exports = indexRouter;
