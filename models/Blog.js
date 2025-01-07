const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Blog title is required'],
        maxLength: [200, 'Blog Title can not be more than 150 characters']

    },
    content : {
        type : String,
        required : [true, 'Blog Content is required']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

module.exports = mongoose.model('Blog', BlogSchema);