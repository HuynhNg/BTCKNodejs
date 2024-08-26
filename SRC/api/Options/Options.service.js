import OptionModel from '../../model/Option.Model';

class OptionsService{
    async CreateOption(NewOption){
        try{
            return await OptionModel.CreateOption(NewOption);
        }catch(err){
            throw err;
        }
    }
}
export default new OptionsService();