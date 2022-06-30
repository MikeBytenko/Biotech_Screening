const router = require("express").Router();
const Notes = require("../../models/notes");
const { permit } = require("../../middlewares/permition_roles");
const image = require('./image')
//routes
router.get("/last", permit(["user"]), getLast);
router.get("/", permit(["user"]), read);
router.post("/", permit(["user"]), create);
router.delete("/:id", permit(["user"]), del);

/**
 * Get notes
 */
async function read(req, res) {
  try {
    const foundUser = req.user;
    const notes = foundUser.notes;
    res.json(notes);
  } catch (error) {
    res.status(404).json({
      message: "User is not found",
    });
  }
}

/**
 * Get last note
 */
async function getLast(req, res) {
  const foundUser = req.user;
  const notes = foundUser.notes;
  if (notes.length == 0) {
    return res.status(500).json("this user has no notes yet");
  } else {
    lastNote = notes[notes.length - 1];
    return res.json(lastNote);
  }
}

/**
 * create user params
 */
async function create(req, res) {
  try {
    let newNote = {};

    const {  note, date } = req.body;
    newNote = { note, image, date };
    newNote.user = req.user.id;
    //validation(createNote)
    let foundUser = req.user;
    foundUser.notes.push(newNote);
    await foundUser.save();
    res.json(Notes.format(newNote));
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

/**
 * Delete body params
 */
async function del(req, res) {
  try {
    noteId = req.params.id;
    const user = req.user;
    let removedoc = user.notes.find(param => {
      return param.id == noteId;
    });
    user.notes.remove(removedoc);
    if (removedoc == undefined) {
      return res.status(500).json({
        message: "Document doesn't exist",
      });
    }
    await user.save();
    return res.status(201).json(removedoc);
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}
//export
module.exports = router;
