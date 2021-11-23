import {expose} from 'comlink'; 
import ModelWorker from './train-worker';

export type ModelWorkerType = typeof ModelWorker; 
expose(ModelWorker);