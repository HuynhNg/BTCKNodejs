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
                return res.status(404).json({
                    success: false,
                    message: "Poll not found"
                })
            }
            return res.status(200).json({
                success: true,
                Polls: Poll
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async GetPollByUserID(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const Polls = await PollModel.getPollByUserID(UserID);
            console.log(Polls);
            if(Polls.length === 0){
                return res.status(404).json({
                    success: false,
                    message: "Poll not found"
                })
            }
            return res.status(200).json({
                success: true,
                Polls: Polls
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
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
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async UpdatePoll(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const PollID = req.body.PollID;
            const Title = req.body.Title;
            const Poll = await PollModel.getPollByID(PollID);
            if(!Poll){
                return res.status(404).json({
                    success: false,
                    message: "Poll not found"
                })
            }
            if(Poll.UserID != UserID){
                return res.status(405).json({
                    success: false,
                    message: "You can't update this poll"
                })
            }
            UsersService.UpdatePoll(PollID,Title);
            return res.status(200).json({
                success : true,
                message: "Update successful"
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async DeletePoll(req,res,next){
        try{
            const PollID = parseInt(req.params.PollID);
            const Poll = await PollModel.getPollByID(PollID);
            if(!Poll){
                return res.status(404).json({
                    success: false,
                    message: "Poll not found"
                })
            }
            if(Poll.UserID != parseInt(req.decode.UserID)){
                return res.status(405).json({
                    success: false,
                    message: "You can't delete this poll"
                })
            }
            PollModel.DeletePoll(PollID);
            return res.status(200).json({
                success : true,
                message: "Delete successful"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }


    // Option
    async CreateOption(req,res,next){
        try{
            const Poll= await PollModel.getPollByID(req.body.PollID);
            if(!Poll)
            {
                return res.status(404).json({
                    success : false,
                    message: "Poll not found"
                })
            }
            if(await OptionModel.GetOptionByContent(req.body.Content)){
                return res.status(409).json({
                    success : false,
                    message: "This option already exit"
                })
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
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async GetOption(req,res,next){
        try{
            if(req.query.PollID){
                const Poll= await PollModel.getPollByID(req.query.PollID);
                if(!Poll){
                    return res.status(404).json({
                        success: false,
                        message: "Poll not found"
                    })
                }
                const Options = await OptionModel.GetOptionByPollID(req.query.PollID);
                if(Options.length == 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Option not found"
                    })
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
                    return res.status(404).json({
                        success: false,
                        message: "Option not found"
                    })
                }
                return res.status(200).json({
                    success: true,
                    Options: Option
                })
            }
        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }

    //Vote
    async CreateVote(req, res, next){
        try{
            const OptionID = req.body.OptionID;
            const CheckOption = await OptionModel.GetOptionByOptionID(OptionID);
            if(!CheckOption){
                return res.status(404).json({
                    success: false,
                    message: "Option not found"
                })
            }
            if(await VoteModel.GetVoteByUserIDAndOptionID(req.decode.UserID, OptionID)){
                return res.status(409).json({
                    success: false,
                    message: "Vote already exist"
                })
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
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }

    async DeleteVote(req,res,next){
        try{
            const OptionID = req.body.OptionID;
            const CheckOption = await OptionModel.GetOptionByOptionID(OptionID);
            if(!CheckOption){
                return res.status(404).json({
                    success: false,
                    message: "Option not found"
                })
            }
            if(!(await VoteModel.GetVoteByUserIDAndOptionID(req.decode.UserID, OptionID))){
                return res.status(404).json({
                    success: false,
                    message: "Vote not found"
                })
            }
            const DelVote={
                OptionID: OptionID,
                UserID: req.decode.UserID
            }
            await UsersService.DeleteVote(DelVote);
            return res.status(200).json({
                success: true,
                message: "Delete vote successfully"
            })

        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
}
export default new UsersController();