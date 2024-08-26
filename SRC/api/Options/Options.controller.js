import OptionsService from "./Options.service";
import PollModel from "../../model/Poll.Model";
import OptionModel from "../../model/Option.Model";

class OptionsController{
    async CreateOption(req,res,next){
        try{
            const Poll= await PollModel.getPollByID(req.body.PollID);
            if(!Poll)
            {
                const Err = new Error("Poll not found");
                Err.status=404;
                return next(Err);
            }
            if(await OptionModel.GetOptionByContent(req.body.Content,req.body.PollID)){
                // return res.status(409).json({
                //     success : false,
                //     message: "This option already exit"
                // })
                const Err = new Error("This option already exists");
                Err.status=409;
                return next(Err);
            }
            const NewOption= {
                PollID: req.body.PollID,
                Content: req.body.Content
            }
            OptionsService.CreateOption(NewOption);
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
}
export default new OptionsController();