var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


blogPost = new Schema({
    author: ObjectId,
    title:  String,
    body:   String,
    date:   Date,
    image:  String
});


modules.exports.BlogPost = mongoose.model('BlogPost', blogPost);
