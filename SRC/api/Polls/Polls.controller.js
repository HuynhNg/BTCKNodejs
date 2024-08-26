import PollsService from "./Polls.service";
import PollModel from "../../model/Poll.Model";
class PollsController{
    async GetPollByID(req,res,next){
        try{
            const ID = parseInt(req.params.PollID);
            const Poll = await PollsService.GetPollByID(ID);
            if(Poll == null){
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
            PollsService.CreatePoll(NewPoll);
            return res.status(201).json({
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
                const Err = new Error("You cant update this poll");
                Err.status=403;
                return next(Err);
            }
            PollsService.UpdatePoll(PollID,Title);
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
                Err.status=403;
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
}
export default new PollsController();