const multer = require('multer');
const fs = require('fs');
const utils = require('../utils');

const dir = './uploads';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.');
    const filename = `${new Date().getTime()}${utils.generateUUID(3, { numericOnly: true })}.${extension[extension.length - 1]}`;
    cb(null, filename);
  }
});

const bulkupload = multer({ storage });

module.exports = bulkupload;
