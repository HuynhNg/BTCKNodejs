import errorHandler from "./handleError.middleware";
class validateMiddleware{
    validateResgister(req,res,next){
        if(!req.body.Email){
            const ERR = new Error("Email is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        if(!req.body.Name){
            const ERR = new Error("Name is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        if(!req.body.Password){
            const ERR = new Error("Password is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }
    validateForgetPassword(req,res,next){
        if(!req.body.Email){
            const ERR = new Error("Email is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }


    validatePoll(req,res,next){
        if(!req.body.Title){
            const ERR = new Error("Title is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }
    validateUpdatePoll(req,res,next){
        if(!req.body.PollID){
            const ERR = new Error("PollID is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        if(!req.body.Title){
            const ERR = new Error("Title is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }

    validateOption(req,res,next){
        if(!req.body.PollID){
            const ERR = new Error("PollID is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        if(!req.body.Content){
            const ERR = new Error("Content is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }

    validateVote(req,res,next){
        if(!req.body.OptionID){
            const ERR = new Error("OptionID is not empty");
            ERR.status=400;
            return errorHandler(ERR,req,res,next);
        }
        next();
    }
}
export default new validateMiddleware();