
import express from 'express';
import {type User} from '../models/index.ts'
const authRoutes = express.Router({mergeParams: true});
 // @ts-ignore
import {login, signup, authenticateToken} from '../services/auth.ts'

authRoutes.get("/protected", authenticateToken(["admin"]), (req, res) => {

  //@ts-ignore
  const u: User = req.user;
  const userName:string = u.username; 
  res.status(200).json({ message: `Welcome Admin ${userName}!` });
});

authRoutes.post('/signup', (req, res) => {
  signup (req, res);
});


// Login route 
authRoutes.post('/login', (req, res) => {
  login(req, res);
})

export {authRoutes};