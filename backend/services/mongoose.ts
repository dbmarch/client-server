import mongoose from 'mongoose';
import { Login, type LoginDocument } from '../models/login.model.ts';
import dotenv from 'dotenv';

dotenv.config();
const loginString = "mongodb://admin:password@localhost:27017/admin";

const DATABASE_URL = process.env.DATABASE_URL as string || loginString;

//*****************************************************************************
export async function openDatabase() {
   try {
      // Connect to MongoDB
      await mongoose.connect(DATABASE_URL);
      console.log("MongoDB connected successfully");
   } catch(err) {
      console.error ('Unable to open database', err)
   }
}

//*****************************************************************************
export async function closeDatabase() {
   try {
      // Connect to MongoDB
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
   } catch(err) {
      console.error ('Unable to close database', err)
   }
}

//*****************************************************************************
export async function findUser(username: string) {
try{  
    // Save the document to the database
    const user = await Login.findOne({ username });
    return user;
   } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

//*****************************************************************************
export async function saveUser(newUser: LoginDocument) {
  try {
    // Save the document to the database
    await newUser.save();
    console.log('User saved:', newUser);
   } catch (err) {
    console.error('MongoDB connection error:', err);
  } 
}

//*****************************************************************************
export async function retrieveUsers() {
  try {
    // Find all users
    const users = await Login.find({});
    console.log('All users:', users);
    return users;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return [];
  } 
}


//*****************************************************************************
export async function deleteUser(existingUser: string) {
  try {
    const result = await Login.deleteMany({ username: existingUser });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } 
  return [];
}
