const Message = require('../models/messageModel');

// Create a new message
const createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all messages
 const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a message by ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send();
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a message
const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!message) {
      return res.status(404).send();
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).send();
    }
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage
}
