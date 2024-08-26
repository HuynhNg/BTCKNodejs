import UserModel from "../../model/User.Model";
import Authentication from "../../Authentication/Authentication";
import VotesService from "./Votes.service";
import PollModel from "../../model/Poll.Model";
import OptionModel from "../../model/Option.Model";
import VoteModel from "../../model/Vote.Model";

class VotesController{
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
            await VotesService.CreateVote(NewVote);
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
            await VotesService.DeleteVote(DelVote);
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

export default new VotesController();