import { useSelector } from "react-redux";
import { IModel } from "../../../adapters/INNLib";
import { RootState } from "../../../store";


const Train = () => {
    const model : undefined | IModel = useSelector<RootState>((state) => state.model.currentModel) as undefined | IModel;

    if(model === undefined){
        return <p>No model available.</p>;
    }
    
    return <p>{model.summary()}</p>;
}

export default Train;