const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Question schema
const questionSchema = new Schema(
    {
      title : {
        type : String,
        required : true,
        maxlength : 255,
      },
      content : {
        type : String,
        required : true,
        maxlength : 5000, // Adjust the max length as needed
      },
      author : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
      },
      tags : [
        {
          type : String,
          trim : true,
          maxlength : 50,
        },
      ],
      answers : [
        {
          type : Schema.Types.ObjectId,
          ref : 'Answer',
        },
      ],
    },
    {
      timestamps :
          true, // Add timestamps (createdAt and updatedAt) to the document.
    });

// Create the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
