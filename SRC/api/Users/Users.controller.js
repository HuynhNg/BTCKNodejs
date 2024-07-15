import UserModel from "../../model/User.Model";
import Authentication from "../../Authentication/Authentication";
import UsersService from "./Users.service";
class UsersController{
    async CreatePoll(req,res,next){
        try{
            const UserID = req.decode.UserID;
            const NewPool = {
                UserID: UserID,
                Title: req.body.Title
            }
            UsersService.CreatePool(NewPool);
            return res.status(200).json({
                success: true,
                message: "Create pool successfull"
            })
        }catch{
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
export default new UsersController();