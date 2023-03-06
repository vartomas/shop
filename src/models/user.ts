import bcrypt from 'bcrypt';
import mongoose, { Model, Schema, models } from 'mongoose';

interface UserSchema {
  email: string;
  password: string;
  tokens: { token: string }[];
  firstname: string;
  lastname: string;
  adress: string;
  city: string;
  country: string;
  phonenumber: string;
  admin: boolean;
}

const userSchema = new Schema<UserSchema>({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    min: [6, 'Min 6 chars password'],
  },
  tokens: [{ token: String }],
  firstname: String,
  lastname: String,
  adress: String,
  city: String,
  country: String,
  phonenumber: String,
  admin: Boolean,
});

userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else next();
});

export const User = (models.User as Model<UserSchema>) || mongoose.model('User', userSchema);
