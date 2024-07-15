import pool from '../database/config'
import dotenv from 'dotenv'

dotenv.config();
class PollModel{
    constructor(PollID,UserID,Title){
        this.PollID = PollID;
        this.UserID = UserID;
        this.Title = Title;
    }
    async getAllPoll(){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = connection.query('Select * from Polls');
            //console.log(rows);
            connection.release();
            return rows;
        }
        catch(err){
            console.log("ERR PollModel GetAll: ",err);
            throw err;
        }
    }
    async getPollByID(id){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = connection.query('Select * from Polls where PollID = ?',[id]);
            //console.log(rows);
            connection.release();
            return rows[0];
        }
        catch(err){
            console.log("ERR PollModel getByID: ",err);
            throw err;
        }
    }
    async getPollByUserID(UserID){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = connection.query('Select * from Polls where UserID = ?',[UserID]);
            //console.log(rows);
            connection.release();
            return rows;
        }
        catch(err){
            console.log("ERR PollModel getByUserID: ",err);
            throw err;
        }
    }
    async addPoll(Poll){
        try{
            const connection = await pool.getConnection();
            const query = `
                Insert into Polls (Title, UserID, Day)
                VALUE (?,?,?)`
            ;
            const value= [Poll.Title,Poll.UserID,Date.now()];
            await connection.query(query,value);
            //console.log("AddPoll ok");
            connection.release();
            return ;
        }
        catch(err){
            console.log("ERR PollModel addPoll: ",err);
            throw err;
        }
    }
    async UpdatePoll(id,Content){
        try{
            const connection = await pool.getConnection();
            const query = `
                Update Polls
                Set Content = ?
                where PollID = ?
            `;
            const value = [Content,id];
            await connection.query(query,value);
            connection.release();
            return ;
        }
        catch(err){
            console.log("ERR PollModel Update: ",err);
            throw err;
        }
    }
    async DeletePoll(id){
        try{
            const connection = await pool.getConnection();
            await connection.query('Delete From Users where PollID = ?',[id]);
            connection.release();
            return ;
        }
        catch(err){
            console.log("ERR PollModel Delete: ",err);
            throw err;
        }
    }
}
export default new PollModel;