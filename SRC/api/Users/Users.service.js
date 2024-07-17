import UserModel from '../../model/User.Model';
import PollModel from '../../model/Poll.Model';
import OptionModel from '../../model/Option.Model';
import VoteModel from '../../model/Vote.Model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Authentication from '../../Authentication/Authentication';
import mailService from '../../mail/mail.service';
class UsersService{
    //Poll
    async GetPollByID(ID){
        try{
            console.log(ID);
            return await PollModel.getPollByID(ID);
        }
        catch(err){
            throw err;
        }
    }
    async CreatePoll(NewPoll){
        try{
            await PollModel.addPoll(NewPoll);
        }catch(err){
            throw err;
        }
    }
    async UpdatePoll(PollID,Title){
        try{
            await PollModel.UpdatePoll(PollID,Title);
        }
        catch(err){
            throw err;
        }
    }


    //Option
    async CreateOption(NewOption){
        try{
            await OptionModel.CreateOption(NewOption);
        }catch(err){
            throw err;
        }
    }

    // Vote
    async CreateVote(NewVote){
        try{
            const Quantity = parseInt((await OptionModel.GetOptionByOptionID(NewVote.OptionID)).Quantity)+1;
            if(await VoteModel.CreateVote(NewVote)){
                await OptionModel.UpdateQuantity(NewVote.OptionID, Quantity);
            }
        }catch(err){
            throw err;
        }
    }
    async DeleteVote(DelVote){
        try{
            const Quantity = parseInt((await OptionModel.GetOptionByOptionID(DelVote.OptionID)).Quantity)-1;
            if(await VoteModel.DeleteVote(DelVote)){
                await OptionModel.UpdateQuantity(DelVote.OptionID, Quantity);
            }
        }catch(err){
            throw err;
        }
    }
}
export default new UsersService();