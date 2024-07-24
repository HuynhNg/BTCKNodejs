import pool from '../database/config'
import dotenv from 'dotenv'
dotenv.config();

class VoteModel{
    constructor(VoteID, OptionID, UserID){
        this.VoteID= VoteID,
        this.OptionID = OptionID,
        this.UserID = UserID
    }
    async GetVoteByUserIDAndOptionID(UserID, OptionID){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query("Select * from Votes where UserID=? and OptionID=?",[UserID,OptionID]);
            connection.release();
            return rows[0];
        }catch(err){
            console.log("ERR VoteModel: ",err);
            throw err;
        }
    }
    async CreateVote(NewVote){
        try{
            const connection = await pool.getConnection();
            const query = `
                Insert into Votes (OptionID, UserID)
                Value (?,?)
            `;
            const value = [NewVote.OptionID, NewVote.UserID];
            await connection.query(query,value);
            connection.release();
            return 1;
        }catch(err){
            console.log("ERR VoteModel: ",err);
            throw err;
        }
    }
    async DeleteVote(DelVote){
        try{
            const connection = await pool.getConnection();
            const query = `
                Delete from Votes where OptionID = ? and UserID =?
            `;
            const value = [DelVote.OptionID, DelVote.UserID];
            await connection.query(query,value);
            connection.release();
            return 1;
        }catch(err){
            console.log("ERR VoteModel: ",err);
            throw err;
        }
    }
}
export default new VoteModel;