import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import {type User} from '../models/index.ts'
import {saveUser, retrieveUsers, findUser, deleteUser } from './mongoose.ts'
import { Login, type LoginDocument } from '../models/login.model.ts';

dotenv.config(); 

// Authentication from 
// https://dev.to/cerbos/authentication-and-authorization-in-nodejs-applications-12fk


//*****************************************************************************
const login = async (req: express.Request, res: express.Response) => {
   const {
    username,
    password
  } = req.body;

  try {
    const user = await findUser(username);
    if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      console.log ('user', user);
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign({
        username: user.username,
        role: user.role
      },
        process.env.JWT_SECRET ?? '', {expiresIn: '1h',}
      );

      res.status(200).json({token});
      console.log(`User ${username} signed in`)
  } catch(err) {
      console.error('error from saveuser', err);
      res.status(301).json({
          message: `User Login failed: ${err}`
    })
  } 
}


//*****************************************************************************
const signup = async (req: express.Request, res: express.Response) => {

  const { username, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

   const newUser: LoginDocument = new Login({
      username,
      password: hashedPassword,
      role
    });

  let success = false;

  try {
    await deleteUser(username);
    await saveUser(newUser);
    success = true;
    res.status(201).json({
       message: 'User registered successfully'
    });
  } catch(error) {
    console.error('error from saveuser');
    res.status(301).json({
      message: 'User registration failed'
    })
  } 
};


//*****************************************************************************
function authenticateToken(allowedRoles: string[]) {
  console.log ('authenticate')
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    console.log ("verify", token)
    jwt.verify(token, process.env.JWT_SECRET ?? '', (err, user) => {
      if (err) {
        return res.status(403).json({
          message: 'Invalid token'
        });
      }
      const u: any = user;
      const role: string = u?.role ?? '';
      if (!allowedRoles.includes(role)) {
        console.log ('allowed', allowedRoles);
        console.log ('logged in as', role);

        res.status(403).json({
          message: 'You do not have the correct role'
        });
        
        // @ts-ignore
        req.user = user;
        next();
        
      }

    });
  };
}
export{login, signup, authenticateToken};