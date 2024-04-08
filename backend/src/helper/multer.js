const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file: ", file);
    cb(null, "./src/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/mp4" ||
    file.mimetype == "image/webp"
  ) {
    cb(null, true);
  } else {
    cb("Please upload the right image format");
  }
};

// Initialize multer with options for multiple images
const uploadMultiple = multer({
  storage: storage,
  fileFilter: multerFilter,
}).array("image_url", 10); // 'images' is the name of the field in the form that holds the files, and 10 is the maximum number of files allowed.

module.exports = uploadMultiple;
