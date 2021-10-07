import { Typography, Divider, Container } from "@mui/material";
import { styled } from "@mui/system";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { useContext, useEffect, useState } from "react";
import ModelContext from "../../../../context/model-context";
import { Activation, Regularizer } from "../nn-elements";

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
  overflowY: "scroll",
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
  const setValue = (arg: string) => {
    return (val: any) => {
      selectedNode?.data.setArgs((oldArgs: Object) => {
        console.log("arg: ", arg, "val: ", val);
        return { ...oldArgs, [arg]: val };
      });
    };
  };

  let objs: JSX.Element[] = [];
  if (selectedNode !== undefined) {
    // make types right

    objs = Object.keys(selectedNode.data.menu).map((key, index) => {
      console.log("key: ", key, "value: ", selectedNode?.data.menu[key]);
      const subset = selectedNode?.data.menu[key];
      return (
        <OptionGroup label={key}>
          {Object.keys(subset).map((key, index) => {
            console.log("key: ", key, "value: ", subset[key]);
            console.log("args key: ", selectedNode.data.args[key]);
            switch (subset[key]) {
              case "string":
                return (
                  <TextInput
                    key={key}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                    id={`text-${key}`}
                    name={key}
                    helperText={"helper text"}
                  />
                );

              case "activation":
                return (
                  <SelectInput
                    key={`select-activation-${key}`}
                    id={"select-activation"}
                    name={key}
                    options={Object.keys(Activation)}
                    value={selectedNode.data.args[key]}
                    setValue={setValue(key)}
                  />
                );
              case "number":
                return <p>number</p>;
                break;
              case "boolean":
                return <p>boolean</p>;
                break;
              case "initializer":
                return <p>initializer</p>;
                break;
              case "constaint":
                return <p>constaint</p>;
                break;
              case "regularizer":
                return (
                  <SelectInput
                    key={`select-${key}`}
                    id={`select-${key}`}
                    name={key}
                    options={Object.keys(Regularizer)}
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
