const message = require('../models/messageModel');
const Message = require('../models/messageModel');

// // Create a new message
// const sendMessage =  async (req, res) => {
//   const { message, receiver, sender } = req.body;

//   try {
//     const newMessage = new Message({ sender, receiver, message });
//     await newMessage.save();
//     res.status(201).json(newMessage);
// } catch (err) {
//     res.status(500).json({ error: err.message });
// }

// };

// // Get messages between two users
// const fetchMessages = async (req, res) => {
//   const { doctorId, userId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: userId, receiver: doctorId },
//         { sender: doctorId, receiver: userId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// Send message
const sendMessage= async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  await message.save();
  res.status(201).send(message);
};

// Get messages between two users
const fetchMessages = async (req, res) => {
  const { sender, receiver } = req.query;
  const messages = await Message.find({
      $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
      ]
  }).sort({ timestamp: 1 });
  res.send(messages);
};

const loadMessage = async(req, res) => {
  try{
    const messages = await message.find().sort({timestamp :1}).exec();
    res.status(200).json(messages);
  }
  catch (err){
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = {
  sendMessage,
  fetchMessages,
  loadMessage
}
