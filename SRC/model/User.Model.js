import pool from '../database/config'
import dotenv from 'dotenv'

dotenv.config();
class UserModel{
    constructor(UserID, Name, Email, Password){
        this.UserID = UserID;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
    }
    async getAllUsers() {
        try {
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM Users');
            // console.log(rows);
            connection.release();
            return rows;
        }
        catch(err){
            console.log('ERR UserModel getALL: ',err);
            throw err;
        }
    }
    async getUserByID(id){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query('Select * From Users where UserID = ?',[id]); 
            //console.log(rows);
            connection.release();
            return rows[0];
        }
        catch(err){
            console.log('ERR Usermodel getUserByID: ', err);
            throw err;
        }
    }
    async getUserByEmail(Email){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query('Select * from Users where Email =?',[Email]);
            // console.log(rows);
            connection.release();
            return rows[0];
        }
        catch(err){
            console.log('ERR Usermodel getUserByEmail: ', err);
            throw err;
        }
    }
    async getUserByToken(Token){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query('Select * from Users where TokenReset = ?',[Token]);
            // console.log(rows);
            connection.release();
            return rows[0];
        }
        catch(err){
            console.log('ERR Usermodel getUserByToken: ',err);
            throw err;
        }
    }
    async addUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `
                INSERT INTO Users (Name, Email, Password)
                VALUES (?, ?, ?)
            `;
            const values = [user.Name, user.Email, user.Password];
            await connection.query(query, values);
            connection.release();
            return this.getAllUsers();
        }   
        catch(err){
            console.error('ERR UserModel AddUser: ',err);
            throw err;
        }
    }
    async UpdateUser(id,user){
        try{
            const connection = await pool.getConnection();
            const query = `
                UPDATE Users
                SET Name = ?, Email = ?, Password = ?
                WHERE UserID = ?
            `;
            const values = [user.Name, user.Email, user.Password, id];
            await connection.query(query, values);
            connection.release();
            return this.getAllUsers();
        }
        catch(err){
            console.error('ERR UserModel UpdateUser: ',err);
            throw err;
        }
    }
    async UpdatePassword(id,pass){
        try{
            const connection = await pool.getConnection();
            const query = `
                UPDATE Users
                SET Password = ?
                WHERE UserID = ?
            `;
            const values = [pass, id];
            const [result] = await connection.query(query, values);
            await connection.query(query, values);
            connection.release();
            return this.getAllUsers();
        }
        catch(err){
            console.error('ERR UserModel UpdatePass: ',err);
            throw err;
        }
    }
    async SetTokenReset(TokenReset,Email){
        try{
            const connection = await pool.getConnection();
            const Expired = new Date(Date.now() + parseInt(process.env.Time));

            // console.log(Expired);
            const query = `
                UPDATE Users
                SET TokenReset=? , Expired = ?
                WHERE Email=?
            `;
            const values = [TokenReset,Expired,Email];
            // console.log( TokenReset, ' ', Expired, ' ' , Email )
            await connection.query(query, values);
            connection.release();
            return ;
        }
        catch(err){
            console.error('ERR UserModel SetTokenReset: ',err);
            throw err;
        }
    }
    async DeleteUser(id){
        try{
            const connection = await pool.getConnection();
            connection.query('Delete From Users where UserID = ?',[id]);
            connection.release();
            return this.getAllUsers();
        }
        catch(err){
            console.error('ERR UserModel: ',err);
            throw err;
        }
    }
}
export default new UserModel();