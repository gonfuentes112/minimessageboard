const { Router } = require("express");
const queries = require("../db/queries");
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const messages = await queries.getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", async (req, res) => {
  const newName = req.body.username;
  const newText = req.body.messagetext;
  await queries.insertMessage({
    user: newName,
    text: newText,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/messages/:messageid", async (req, res) => {
  const messageid = Number(req.params.messageid);
  const rows = await queries.getMessageById(messageid);
  res.render("messagedetail", { message: rows[0] });
});

module.exports = indexRouter;
