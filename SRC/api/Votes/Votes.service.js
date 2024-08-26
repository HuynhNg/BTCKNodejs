import OptionModel from '../../model/Option.Model';
import VoteModel from '../../model/Vote.Model';

class VotesService{
    async CreateVote(NewVote){
        try{
            await VoteModel.CreateVote(NewVote);
            const Option = await OptionModel.GetOptionByOptionID(NewVote.OptionID);
            const Quantity = Option.Quantity+1;
            await OptionModel.UpdateQuantity(NewVote.OptionID,Quantity);
            return;
        }catch(err){
            throw err;
        }
    }
    async DeleteVote(DelVote){
        try{
            await VoteModel.DeleteVote(DelVote);
            const Option = await OptionModel.GetOptionByOptionID(DelVote.OptionID);
            const Quantity = Option.Quantity-1;
            await OptionModel.UpdateQuantity(DelVote.OptionID,Quantity);
            return ;
        }catch(err){
            throw err;
        }
    }
}

export default new VotesService();