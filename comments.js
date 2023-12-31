// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import database
const db = require('./database');

// Create web server
const app = express();

// Configure web server
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route for getting comments
app.get('/comments', (req, res) => {
    db.Comment.find({}, 'name comment', (error, comments) => {
        if (error) {
            console.error(error);
        }
        res.send({
            comments: comments
        });
    }).sort({_id: -1});
});

// Create route for posting comments
app.post('/comments', (req, res) => {
    const comment = new db.Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((error) => {
        if (error) {
            console.error(error);
        }
        res.send({
            success: true,
            message: 'Comment saved successfully!'
        });
    });
});

// Start web server
app.listen(process.env.PORT || 8081);

// Path: database.js
// Create database connection

// Import modules
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments');
const db = mongoose.connection;

// Create schema for comments
const CommentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model for comments
const Comment = mongoose.model('Comment', CommentSchema);

// Export model
module.exports = {
    Comment
};

