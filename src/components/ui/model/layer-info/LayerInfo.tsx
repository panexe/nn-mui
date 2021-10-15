// REACT
import { useContext } from "react";

//  MUI
import { Typography, Divider, Container } from "@mui/material";
import { styled } from "@mui/system";

// NNUI
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckBoxInput from "./CheckBoxInput";
import NumberInput from "./NumberInput";
import ModelContext from "../../../../context/model-context";
import {
  ACTIVATIONS,
  CONSTRAINTS,
  INITIALIZERS,
  REGULARIZERS,
} from "../nn-elements";
import {
  FlowElement,
  isNode,
  updateEdge,
  useStore,
  useStoreActions,
  useStoreState,
} from "react-flow-renderer";
import { setSelectedElements } from "react-flow-renderer/dist/store/actions";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const LayerName = styled(Typography)(({ theme }) => ({
  padding: ".1em",
  paddingTop: ".3em",
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const StyledOptionGroup = styled(Container)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  paddingLeft: 0,
}));

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarColor: theme.palette.action.hover,
}));

interface Props {
  children?: React.ReactNode;
  label: string;
}
/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

const OptionGroup = (props: Props) => {
  return (
    <StyledOptionGroup>
      <Typography variant="h5">{props.label} </Typography>
      {props.children}
      <Divider sx={{ marginTop: "12px" }} />
    </StyledOptionGroup>
  );
};

const LayerInfo = () => {
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements = [...nodes, ...edges];
  const selectedElements = useStoreState((state) => state.selectedElements);
  const setElements = useStoreActions((actions) => actions.setElements);
  const setSelectedElements = useStoreActions((action)=> action.setSelectedElements);

  const emptyReturn = (
    <StyledDiv>
      <LayerName variant="h4">{"Nothing is selected."}</LayerName>

      <Divider />
    </StyledDiv>
  );
  if(nodes.length > 0) return <div id='layerinfo-portal'></div>

  if (
    selectedElements === undefined ||
    selectedElements === null ||
    selectedElements?.length === 0
  ) {
    return emptyReturn;
  }

  if(selectedElements.length > 1){
    return emptyReturn;
  }
  const selectedNode = elements.find( (el) => el.id === selectedElements[0].id);

  

  /**
   *
   * @param arg argument that should be updated
   * @returns a function that updates the given argument on the elements in context
   */
  const setValue = (arg: string) => {
    return (val: any) => {
      setElements([]);
      return;
      setElements(
        elements.map((el) => {
            if (selectedNode?.id === el.id) {
              console.log("selected node:", elements);
              setSelectedElements(elements.find((el) => el.id === '4'));
              const args = {
                ...el.data.args,
                [arg]: val,
              }
              el.data = {
                ...el.data,
                args: args,
                changed: true,
                changedValue: 'yes',
              };
            }
            return el;
          })
      );
      
      console.log("updated:", arg, 'to val', val);
    };
  };

  // getting all options
  let objs: JSX.Element[] = [];
  if (selectedNode !== undefined) {
    // TODO: make types right

    objs = Object.keys(selectedNode.data.menu).map((keyCat, index) => {
      const subset = selectedNode.data.menu[keyCat];
      return (
        <OptionGroup key={keyCat} label={keyCat}>
          {Object.keys(subset).map((key, index) => {
            switch (subset[key]) {
              case "string":
                return (
                  <TextInput
                    key={key}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                    name={key}
                  />
                );

              case "activation":
                return (
                  <SelectInput
                    key={`select-${key}`}
                    id={`select-${key}`}
                    name={key}
                    options={Object.keys(ACTIVATIONS)}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              case "number":
                return (
                  <NumberInput
                    key={key}
                    min={1}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                    id={`text-${key}`}
                    name={key}
                  />
                );
              case "boolean":
                return (
                  <CheckBoxInput
                    key={key}
                    name={key}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              case "initializer":
                return (
                  <SelectInput
                    key={`select-${key}`}
                    id={`select-${key}`}
                    name={key}
                    options={Object.keys(INITIALIZERS)}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              case "constraint":
                return (
                  <SelectInput
                    key={`select-${key}`}
                    id={`select-${key}`}
                    name={key}
                    options={Object.keys(CONSTRAINTS)}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              case "regularizer":
                return (
                  <SelectInput
                    key={`select-${key}`}
                    id={`select-${key}`}
                    name={key}
                    options={Object.keys(REGULARIZERS)}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              default:
                return (
                  <p key={key}>
                    Value: <strong>{key}</strong> of type{" "}
                    <strong>{subset[key]}</strong> is unknown!
                  </p>
                );
            }
          })}
        </OptionGroup>
      );
    });
  }
  return (
    <StyledDiv>
      <LayerName variant="h4">
        {selectedNode ? selectedNode.data.args.name : "layer name"}
      </LayerName>
      <Divider />
      <Container>{objs}</Container>
      <Divider />
    </StyledDiv>
  );
};

export default LayerInfo;
