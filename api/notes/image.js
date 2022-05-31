const express = require('express');
const app = express();
const path = require('path');

const Notes = require('../../models/notes')
const router = express.Router();
const upload = require('../../middleware/uploadMiddleware');
const Resize = require('../../middleware/resize');

//router.get('/', get)


router.post('/postImage', upload.single('image'), postImG);





//async function get(req, res) {
 // res.render('index');
//};

async function postImG(req, res) {
  let newImg = {};
  const imagePath = path.join(__dirname, '../../public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const {filename} = await fileUpload.save(req.file.buffer);
  newImg = {filename};
  newImg.user = req.user.id;
  let foundUser = req.
  found
  return res.status(200).json({ name: filename });
}

module.exports = router;


