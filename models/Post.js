const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    // this references which user created the post and grabs from the user model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    text: {
        type: String,
        required: true
    },

    name: {
        Type: String
    },

    // we can keep the name and avatar even if they delete their profile
    avatar: {
        type: String
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },

            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = Posts = mongoose.model('post', PostSchema);