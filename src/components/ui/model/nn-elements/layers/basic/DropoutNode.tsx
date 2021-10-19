import { dropout } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";

import { DropoutLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import { DataBaseType, layerOutput } from "../../../../../../types";
import { Node } from "react-flow-renderer";
import { blue } from "@mui/material/colors";
import { NodeLayerArgs } from "../..";


interface DropoutArgs extends NodeLayerArgs{
    rate: number; 
    noiseShape: number[] | undefined; 
    seed: number | undefined;
}

const DenseNode = (props: NodeProps<DataBaseType>) => {
  const [rateArg, setRateArg] = useState<number>();

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data]);

  const layerFunction = (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const name = nameArg.length === 0 ? undefined : nameArg;
    const units = unitsArg;
    const useBias = useBiasArg;
    const activation = getActivation(activationArg);
    const kernelInitializer = getInitializer(kernelInitializerArg);
    const biasInitializer = getInitializer(biasInitializerArg);
    const kernelConstraint = getConstraint(kernelConstraintArg);
    const biasConstraint = getConstraint(biasConstraintArg);
    const kernelRegularizer = getRegularizer(kernelRegularizerArg);
    const biasRegularizer = getRegularizer(biasRegularizerArg);
    const ret = dense({
      name: name,
      units: units,
      activation: activation,
      useBias: useBias,
      kernelInitializer: kernelInitializer,
      biasInitializer: biasInitializer,
      kernelConstraint: kernelConstraint,
      biasConstraint: biasConstraint,
      kernelRegularizer: kernelRegularizer,
      biasRegularizer: biasRegularizer,
    } as DenseLayerArgs).apply(input.layerOutput) as SymbolicTensor;

    console.log("output layer dense: ", ret, ret.shape);
    setOutputShape(ret.shape.slice(1).join("x"));

    return { layerOutput: ret, modelInput: input.modelInput } as layerOutput;
  };

  // may need some other performance optimization

  useEffect(() => {
    props.data.changed = true;
  }, [unitsArg]);

  // portals dont work well with focus
  // so we have to implement our own focus logic
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  return (
    <BaseNode
      {...props}
      menu={
        <ArgsMenu>
          <Typography variant="h4" mt={2}>
            options
          </Typography>

          <TextInput<string>
            name="name"
            value={nameArg}
            setValue={setNameArg}
            ref={focused === "name" ? focusRef : null}
            onFocus={() => {
              setFocused("name");
              console.log("focus name");
            }}
          />
          <Divider />
          <TextInput<number>
            number
            name="units"
            value={unitsArg}
            setValue={setUnitsArg}
            ref={focused === "units" ? focusRef : null}
            onFocus={() => {
              setFocused("units");
              console.log("focus units");
            }}
          />
          <Divider />
          <SelectInput
            value={activationArg}
            setValue={(value: string) => {
              setActivationArg(ACTIVATIONS[value as keyof typeof ACTIVATIONS]);
            }}
            name="activation"
            options={Object.keys(ACTIVATIONS)}
            ref={focused === "activation" ? focusRef : null}
            onFocus={() => {
              setFocused("activation");
              console.log("focus activation");
            }}
          />
          <Divider />
        </ArgsMenu>
      }
      layerFunction={layerFunction}
      layerTypeName="dense"
    >
      {}
    </BaseNode>
  );
};

/*
const getDropoutLayerFunction = (args: DropoutArgs) => {
  return (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const rate = args.rate;
    const noiseShape = args.noiseShape;
    const seed = args.seed;

    const ret = dropout({
      rate: rate,
      noiseShape: noiseShape,
      seed: seed,
    } as DropoutLayerArgs).apply(input.layerOutput) as SymbolicTensor;
    return {layerOutput: ret, modelInput: input.modelInput};
  };
};

export const createDropoutFromBase = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType<DropoutArgs>> => {
  return {
    id: id,
    type: "baseNode",
    position: { x: posX, y: posY },
    data: {
      inputValue: undefined,
      outputValue: undefined,
      args: {
        rate: 0.75,
        noiseShape: undefined,
        seed: undefined,
      },
      menu: {
        Options: {
          name: "string",
          rate: "number",
        },
      },
      changed: true,
      getLayerFunction: getDropoutLayerFunction,
      backgroundColor: blue[400],
      error: '',
      layerName: 'dropout',
    },
  }; //as Node<DataBaseType>;
};
*/