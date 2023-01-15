const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model");

noteRouter.get("/", async (req, res) => {
  const notes = await NoteModel.find();
  res.send(notes);
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("New node created");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Unable to create note" });
  }
});

noteRouter.put("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userId_in_note = note.userId;
  const userId_making_from_middle_ware = req.body.userId;
  try {
    // if (
    //   "user's id who is making request" === "userId in that perticular document"
    // ) {
    // }

    if (userId_making_from_middle_ware !== userId_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Note updated" });
    }
  } catch (err) {
    res.send({ msg: "Unable to update" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userId_in_note = note.userId;
  const userId_making_from_middle_ware = req.body.userId;
  try {
    if (userId_making_from_middle_ware !== userId_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send("Delete the  note");
    }
  } catch (err) {
    res.send({ msg: "Unable to delete" });
  }
});

module.exports = {
  noteRouter,
};
