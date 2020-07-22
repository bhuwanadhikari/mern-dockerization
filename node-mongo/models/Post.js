const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String },
    body: { type: String },
})

module.exports = Post = mongoose.model('post', PostSchema);