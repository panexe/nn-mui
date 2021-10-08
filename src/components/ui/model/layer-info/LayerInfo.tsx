import { Typography, Divider, Container } from "@mui/material";
import { styled } from "@mui/system";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import CheckBoxInput from "./CheckBoxInput";
import { useContext, useEffect, useState } from "react";
import ModelContext from "../../../../context/model-context";
import {
  ACTIVATIONS,
  CONSTRAINTS,
  INITIALIZERS,
  REGULARIZERS,
} from "../nn-elements";
import NumberInput from "./NumberInput";

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
  const modelContext = useContext(ModelContext);
  const selectedNode = modelContext.elements.find(
    (el) => el.id === modelContext.selectedNodeId
  );

  /**
   *
   * @param arg argument that should be updated
   * @returns a function that updates the given argument on the elements in context
   */
  const setValue = (arg: string) => {
    return (val: any) => {
      modelContext.setElements((els) => {
        return els.map((el) => {
          // update output value of this node
          if (el.id === modelContext.selectedNodeId) {
            el.data.args = {
              ...el.data.args,
              [arg]: val,
            };
            el.data = { ...el.data, changed: true };
            console.log("changed set to true", el);
            console.log("arg: val", arg, val);
          }
          return el;
        });
      });
    };
  };

  // getting all options
  let objs: JSX.Element[] = [];
  if (selectedNode !== undefined) {
    // TODO: make types right

    objs = Object.keys(selectedNode.data.menu).map((key, index) => {
      const subset = selectedNode.data.menu[key];
      return (
        <OptionGroup key={key} label={key}>
          {Object.keys(subset).map((key, index) => {
            switch (subset[key]) {
              case "string":
                return (
                  <TextInput
                    key={key}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                    id={`text-${key}`}
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
              case "constaint":
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
