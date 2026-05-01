const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');

const UserSchema = new mongoose.Schema({
      userName: { 
        type: String,
        required: [true, 'Please add username'] ,
        unique: true,
        trim: true
    },
      email: { 
        type: String,
        required: [true, 'Please add an email'],
        unique: true ,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
      password: { 
        type: String,
        required: [true, 'Please add a password'],
        minlength: 8,
        select: false // this hides the password from API queries by default
    }
}, {timestamps: true});

// Remove 'next' from the arguments
//
// Pre-save Hook: Hashes the password before saving to the DB.
// Using an async function allows us to skip the 'next' callback in modern Mongoose.
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return; // Just return; Mongoose knows you're done
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No next() call needed here
  } catch (error) {
    throw error; // Throwing inside an async hook is the same as next(error)
  }
});

//helper method to compare passwords during login
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);