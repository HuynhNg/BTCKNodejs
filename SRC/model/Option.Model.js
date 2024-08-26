import pool from '../database/config'
import dotenv from 'dotenv'
dotenv.config();

class OptionModel{
    constructor(OptionID, PollID, Content, Quantity){
        this.OptionID = OptionID,
        this.PollID = PollID,
        this.Content = Content,
        this.Quantity = Quantity
    }
    async CreateOption(NewOption){
        try{
            const connection = await pool.getConnection();
            const query = `
                Insert into Options (PollID, Content)
                Value (?,?)
            `;
            const value= [NewOption.PollID, NewOption.Content];
            await connection.query(query,value);
            connection.release();
            return;
        }
        catch(err){
            console.log("ERR OptionModel CreateOption: ", err);
            throw err;
        }
    }
    async GetOptionByContent(Content,PollID){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query("Select * from Options where Content=? and PollID=?",[Content,PollID]);
            connection.release();
            return rows[0];
        }
        catch(err){
            console.log("ERR OptionModel GetOptionByContent: ", err);
            throw err;
        }
    }
    async GetOptionByPollID(PollID){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query("Select * from Options where PollID=?",[PollID]);
            connection.release();
            return rows;
        }catch(err){
            console.log("ERR GetOptionByPollID: ",err);
            throw err;
        }
    }
    async GetOptionByOptionID(OptionID){
        try{
            const connection = await pool.getConnection();
            const [rows,fields] = await connection.query("Select * from Options where OptionID=?",[OptionID]);
            connection.release();
            return rows[0];
        }catch(err){
            console.log("ERR GetOptionByOptionID: ",err);
            throw err;
        }
    }
    async UpdateQuantity(OptionID, Quantity){
        try{
            const connection = await pool.getConnection();
            const query = `
                UPDATE Options
                SET Quantity = ?
                WHERE OptionID = ?
            `;
            const value= [Quantity, OptionID];
            await connection.query(query,value);
            connection.release();
            return ;
        }
        catch(err){
            console.log("ERR UpdateQuantity: ",err);
            throw err;
        }
    }
}
export default  OptionModel = new OptionModel();