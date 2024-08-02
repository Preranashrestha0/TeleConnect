// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   address: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   age: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// //pre=run before data saved in database 
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;