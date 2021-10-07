import { DataType, Tensor } from "@tensorflow/tfjs-core";
import { Shape } from "@tensorflow/tfjs-layers";

/**
 * Copy of tfjs LayerArgs, because we cant import their
 * interface directly
 * 
 * https://github.com/tensorflow/tfjs/blob/4dfcd782deda0a9fbe9f3cc5c60bbf4293e14577/tfjs-layers/src/engine/topology.ts#L347
 */
export declare interface NodeLayerArgs {
    inputShape?: Shape;
    batchInputShape?: Shape; 
    batchSize?: number;
    dtype?: DataType;
    name?: string;
    trainable?: boolean; 
    weights?: Tensor[];
    inputDType?: DataType;
}

export enum Initializer{
    none='constant', // the value is not used, but we have to use a valid string for type-safety
    constant='constant',
    glorotNormal='glorotNormal',
    glorotUniform='glorotUniform',
    heNormal='heNormal',
    heUniform='heUniform',
    identity='identity' ,
    leCunNormal='leCunNormal',
    leCunUniform='leCunUniform',
    ones='ones',
    orthogonal='orthogonal',
    randomNormal='randomNormal',
    randomUniform='randomUniform',
    truncatedNormal='truncatedNormal',
    varianceScaling='varianceScaling',
    zeros='zeros',
}

export enum Constraint{
    none='maxNorm', // the value is not used, but we have to use a valid string for type-safety
    maxNorm='maxNorm',
    minMaxNorm='minMaxNorm',
    nonNeg ='nonNeg',
    unitNorm='unitNorm',
}

export enum Regularizer{
    none='l1l2',// the value is not used, but we have to use a valid string for type-safety
    l1l2='l1l2',
}

export enum Activation{
    none='linear', // the value is not used, but we have to use a valid string for type-safety
    linear="linear", 
    elu="elu", 
    hardSigmoid="hardSigmoid", 
    relu="relu", 
    relu6="relu6", 
    selu="selu", 
    sigmoid="sigmoid",  
    softmax="softmax", 
    softplus="softplus", 
    softsign="softsign", 
    tanh="tanh", 
    swish="swish", 
    mish="mish",
}