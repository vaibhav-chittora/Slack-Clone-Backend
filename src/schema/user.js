import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists'],
      match: [
        /*eslint-disable */
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [5, 'Password must be at least 8 characters long']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      minlength: [3, 'Username must be at least 3 characters long'],
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only alphanumeric characters'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedpassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedpassword;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
