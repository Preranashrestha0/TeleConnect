const express = require('express');
const { fetchMessages, sendMessage, loadMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/messages',  sendMessage)
router.get('/messages', fetchMessages)
// const {createMessage, getMessages, getMessageById, updateMessage, deleteMessage} = require('../controllers/messageController');

// // Create a new message
// router.post('/messages', createMessage);

// // Get all messages
// router.get('/messages', getMessages);

// // Get a message by ID
// router.get('/messages/:id', getMessageById);

// // Update a message
// router.put('/messages/:id', updateMessage);

// // Delete a message
// router.delete('/messages/:id', deleteMessage);

module.exports = router;
