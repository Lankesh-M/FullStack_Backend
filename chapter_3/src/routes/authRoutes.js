import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import db from '../db.js'
import { get } from 'http';

// console.log(db);

const router = express.Router();

router.post('/register', (req, res) => {
    const {username, password} = req.body;

    // Encrypte the password using bcrypt
    const encryptedPass = bcrypt.hashSync(password, 8);


    try{
        const insertUser = db.prepare(` Insert into users (username, password) values(?, ?)`);

        const result = insertUser.run(username, encryptedPass);
        const userId = result.lastInsertRowid;
        //Add an todo list as an sample
        const insertTodo = db.prepare(' Insert into todos (user_id, task, completed) values(?,?,?)');
        insertTodo.run(userId, "Get Started by adding your task", 0);
    
        //Storing jwt
        const token = jwt.sign({ id:userId}, process.env.SECRET_JWT, {expiresIn:'24h'});
        res.json({token})
    }catch(err){
        console.log(err);
        res.sendStatus(503); //server error
    }
})


router.post('/login', (req, res) => {
    const {username, password} = req.body

    try{
        const getUser = db.prepare(' Select * from users where username = ?');
        const user = getUser.get(username);
        if(!user){
            return res.status(404).send({message:"User not Found"});
        }
        
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        
        if(!isPasswordValid){
            return res.status(401).send({message:"Your password is incorrect"});
        }
        
        console.log(user);
        // Authentication is successfully
        const token = jwt. sign({id:user.id}, process.env.SECRET_JWT, {expiresIn:'24h'});
        res.json({token})
    }catch(err){
        console.log(err);
        res.sendStatus(503);
    }
})

export default router;