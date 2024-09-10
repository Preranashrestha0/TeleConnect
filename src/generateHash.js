const bcrypt = require('bcryptjs');

const generateHash = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Hashed Password:', hashedPassword);
  } catch (err) {
    console.error(err.message);
  }
};

// Replace 'yourpassword' with the actual password you want to hash
generateHash('admin');
