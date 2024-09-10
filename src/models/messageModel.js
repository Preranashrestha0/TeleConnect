const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    // read: {
    //     type: Boolean,
    //     default: false,
    // },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const message = mongoose.model('Message', messageSchema);
module.exports = message;