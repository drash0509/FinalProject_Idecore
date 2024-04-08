const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
  categoryFilter: { type: String },
});

const filterModel = new mongoose.model("Filter", filterSchema);
module.exports = filterModel;
