import PollModel from '../../model/Poll.Model';
class PollsService{
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
           return  await PollModel.addPoll(NewPoll);
        }catch(err){
            throw err;
        }
    }
    async UpdatePoll(PollID,Title){
        try{
            return await PollModel.UpdatePoll(PollID,Title);
        }
        catch(err){
            throw err;
        }
    }
}
export default new PollsService();