import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IModel} from '../adapters/INNLib';

interface modelState{
  currentFlowKey: string; 
  currentModel: undefined | IModel;
}

const initialState : modelState = {
    currentFlowKey: 'default-flow',
    currentModel: undefined, 
};

const modelSlice = createSlice({
  name: "model",
  initialState: initialState,
  reducers: {
    setCurrentFlowKey(state, action: PayloadAction<string>) {
        state.currentFlowKey = action.payload;
    },
    setCurrentModel(state, action: PayloadAction<IModel>){
      state.currentModel = action.payload;
    },
    resetCurrentModel(state, action){
      state.currentModel = undefined;
    }
  },
});

export const modelActions = modelSlice.actions;

export default modelSlice;