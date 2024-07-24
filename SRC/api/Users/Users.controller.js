import UserModel from "../../model/User.Model";
import Authentication from "../../Authentication/Authentication";
import UsersService from "./Users.service";
import PollModel from "../../model/Poll.Model";
import OptionModel from "../../model/Option.Model";
import VoteModel from "../../model/Vote.Model";
class UsersController{
    // Poll
    async GetPollByID(req,res,next){
        try{
            const ID = parseInt(req.params.PollID);
            const Poll = await UsersService.GetPollByID(ID);
            if(Poll == null || Poll.UserID != parseInt(req.decode.UserID)){
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            return res.status(200).json({
                success: true,
                Polls: Poll
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
    async GetPollByUserID(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const Polls = await PollModel.getPollByUserID(UserID);
            console.log(Polls);
            if(Polls.length === 0){
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            return res.status(200).json({
                success: true,
                Polls: Polls
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
    async CreatePoll(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const NewPoll = {
                UserID: UserID,
                Title: req.body.Title
            }
            UsersService.CreatePoll(NewPoll);
            return res.status(200).json({
                success: true,
                message: "Create pool successfull"
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
    async UpdatePoll(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const PollID = req.body.PollID;
            const Title = req.body.Title;
            const Poll = await PollModel.getPollByID(PollID);
            if(!Poll){
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            if(Poll.UserID != UserID){
                // return res.status(405).json({
                //     success: false,
                //     message: "You can't update this poll"
                // })
                const Err = new Error("You can't update this poll");
                Err.status=405;
                return next(Err);
            }
            UsersService.UpdatePoll(PollID,Title);
            return res.status(200).json({
                success : true,
                message: "Update successful"
            })
        }
        catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
    async DeletePoll(req,res,next){
        try{
            const PollID = parseInt(req.params.PollID);
            const Poll = await PollModel.getPollByID(PollID);
            if(!Poll){
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            if(Poll.UserID != parseInt(req.decode.UserID)){
                // return res.status(405).json({
                //     success: false,
                //     message: "You can't delete this poll"
                // })
                const Err = new Error("You can't delete this poll");
                Err.status=405;
                return next(Err);
            }
            PollModel.DeletePoll(PollID);
            return res.status(200).json({
                success : true,
                message: "Delete successful"
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }


    // Option
    async CreateOption(req,res,next){
        try{
            const Poll= await PollModel.getPollByID(req.body.PollID);
            if(!Poll)
            {
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            if(await OptionModel.GetOptionByContent(req.body.Content)){
                // return res.status(409).json({
                //     success : false,
                //     message: "This option already exit"
                // })
                const Err = new Error("This option already exit");
                Err.status=409;
                return next(Err);
            }
            const NewOption= {
                PollID: req.body.PollID,
                Content: req.body.Content
            }
            UsersService.CreateOption(NewOption);
            return res.status(200).json({
                success: true,
                message: "Create Option successful"
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
    async GetOption(req,res,next){
        try{
            if(req.query.PollID){
                const Poll= await PollModel.getPollByID(req.query.PollID);
                if(!Poll){
                    const Err = new Error("Poll not found");
                    Err.status=404;
                    return next(Err);
                }
                const Options = await OptionModel.GetOptionByPollID(req.query.PollID);
                if(Options.length == 0) {
                    const Err = new Error("Option not found");
                    Err.status=404;
                    return next(Err);
                }
                return res.status(200).json({
                    success: true,
                    PollID: req.query.PollID,
                    Options: Options
                })
            }
            if(req.query.OptionID){
                const Option = await OptionModel.GetOptionByOptionID(req.query.OptionID);
                if(!Option){
                    const Err = new Error("Option not found");
                    Err.status=404;
                    return next(Err);
                }
                return res.status(200).json({
                    success: true,
                    Options: Option
                })
            }
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }

    //Vote
    async CreateVote(req, res, next){
        try{
            const OptionID = req.body.OptionID;
            const CheckOption = await OptionModel.GetOptionByOptionID(OptionID);
            if(!CheckOption){
                const Err = new Error("Option not found");
                Err.status=404;
                return next(Err);
            }
            if(await VoteModel.GetVoteByUserIDAndOptionID(req.decode.UserID, OptionID)){
                const Err = new Error("Vote already exist");
                Err.status=409;
                return next(Err);
                // return res.status(409).json({
                //     success: false,
                //     message: "Vote already exist"
                // })
            }
            const NewVote={
                OptionID: OptionID,
                UserID: req.decode.UserID
            }
            await UsersService.CreateVote(NewVote);
            return res.status(200).json({
                success: true,
                message:"Vote successfully"
            })
        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }

    async DeleteVote(req,res,next){
        try{
            const OptionID = req.body.OptionID;
            const CheckOption = await OptionModel.GetOptionByOptionID(OptionID);
            if(!CheckOption){
                const Err = new Error("Option not found");
                Err.status=404;
                return next(Err);
            }
            if(!(await VoteModel.GetVoteByUserIDAndOptionID(req.decode.UserID, OptionID))){
                const Err = new Error("Vote not found");
                Err.status=404;
                return next(Err);
            }
            const DelVote={
                OptionID: OptionID,
                UserID: req.decode.UserID
            }
            console.log(DelVote);
            await UsersService.DeleteVote(DelVote);
            return res.status(200).json({
                success: true,
                message: "Delete vote successfully"
            })

        }catch(err){
            const Err = new Error("Internal Service Error");
            err.status=500;
            return next(Err);
        }
    }
}
export default new UsersController();