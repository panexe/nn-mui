// REACT
import React from "react";
import { useEffect, useMemo, useState } from "react";

// REACT FLOW
import { Node } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer/dist/types";

// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs-layers";

// MUI
import { Divider, Typography } from "@mui/material";

// NNUI
import { ACTIVATIONS, INITIALIZERS, CONSTRAINTS, REGULARIZERS } from "../..";
import {
  DataBaseType,
  layerOutput,
  OptionTypes,
} from "../../../../../../types";
import BaseNode from "./BaseNode";
import ArgsMenu from "../../../layer-info/ArgsMenu";
import TextInput from "../../../layer-info/TextInput";
import SelectInput from "../../../layer-info/SelectInput";
import CheckBoxInput from "../../../layer-info/CheckBoxInput";

/**
 *
 */
interface MenuBaseProps<T> extends NodeProps<DataBaseType> {
  initialArgs: T;
  menu: any;
  tfjsLayer: (args: T) => any; // maybe second generic type
  layerTypeName: string;
}

/**
 *
 * @param props
 * @returns
 */
const MenuBaseNode = <T,>(props: MenuBaseProps<T>) => {
  // output-shape string for display on node
  const [outputShape, setOutputShape] = useState("");

  // state for layer args
  const [layerArgs, setLayerArgs] = useState<T>(props.initialArgs);
  const menu = props.menu;

  useEffect(() => {
    props.data.changed = true;
    //setElements(elements);
    // set all elements new
    console.log("changed data");
    console.log("denselayerargs", layerArgs);
    console.log(Object.keys(layerArgs));
  }, [layerArgs]);

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data]);

  /**
   *
   * @param input
   * @returns
   */
  const layerFunction = (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const ret = props
      .tfjsLayer(layerArgs)
      .apply(input.layerOutput) as SymbolicTensor;

    console.log("output layer dense: ", ret, ret.shape);
    setOutputShape(ret.shape.slice(1).join("x"));

    return { layerOutput: ret, modelInput: input.modelInput } as layerOutput;
  };

  /*++++++++++++++++++++++++++++++++++++++++++++++*/
  /*                Focus management              */
  /*++++++++++++++++++++++++++++++++++++++++++++++*/

  // the sidebar-menu input that has focus
  // (custom focus management)
  const [focused, setFocused] = useState("name");
  // html-refrence to focus an element
  const focusRef = React.createRef<HTMLInputElement>();
  // stores wheter a select is opened (neccesary because of focus management)
  const [openSelect, setOpenSelect] = useState("");
  /**
   * Called on opening a select.
   *
   * Sets the opend select variable to the given one.
   * @param select name of the select-attribute
   */
  const onOpen = (select: string) => {
    console.log("onOpen", select);
    setOpenSelect(select);
  };

  /**
   * Called on closing a select.
   *
   * Sets the opend-select variable to empty string.
   */
  const onClose = () => {
    setOpenSelect("");
  };

  // this actually focuses the current element
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  /*++++++++++++++++++++++++++++++++++++++++++++++*/
  /*                Menu Components               */
  /*++++++++++++++++++++++++++++++++++++++++++++++*/

  /**
   * Creates a menu-heading for the sidebar-menu. 
   * 

   * @param name name of the category
   * @param key unique key for this element
   * @returns JSX.Element mui-Typography
   */
  const createCategory = (name: string, key: string) => {
    return (
      <Typography variant="h4" mt={2} key={key}>
        {name}
      </Typography>
    );
  };

  /**
   * Creates a text-input for the sidebar-menu.
   *
   * Can only be used inside of MenuBaseNode because it uses internal states.
   * @param name
   * @param key
   * @returns
   */
  const createText = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
        <TextInput<string>
          key={key}
          name={name}
          value={(layerArgs as any)[name] ? (layerArgs as any)[name] : ""}
          setValue={(value: string) => {
            setLayerArgs((old) => {
              return { ...old, [name]: value };
            });
          }}
          ref={focused === name ? focusRef : null}
          onFocus={() => {
            setFocused(name);
            console.log(`focus ${name}`);
          }}
        />
        <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  /**
   * Creates a number-input for the sidebar-menu.
   *
   * Can only be used inside of MenuBaseNode because it uses internal states.
   * @param name
   * @param key
   * @returns
   */
  const createNumber = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
        <TextInput<number>
          key={key}
          number
          name={name}
          value={(layerArgs as any)[name]}
          setValue={(value: number) => {
            setLayerArgs((old) => {
              return { ...old, [name]: value };
            });
          }}
          ref={focused === name ? focusRef : null}
          onFocus={() => {
            setFocused(name);
            console.log(`focus ${name}`);
          }}
        />
        <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  /**
   * Creates a select-input for the sidebar-menu.
   *
   * Can only be used inside of MenuBaseNode because it uses internal states.
   * @param name
   * @param options
   * @param key
   * @returns
   */
  const createSelect = (name: string, options: string[], key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
        <SelectInput
          key={key}
          name={name}
          value={(layerArgs as any)[name] ? (layerArgs as any)[name] : "none"}
          setValue={(value: string) => {
            setLayerArgs((old) => {
              return { ...old, [name]: value === "none" ? undefined : value };
            });
          }}
          options={options}
          ref={focused === name ? focusRef : null}
          onFocus={() => {
            setFocused(name);
            console.log(`focus ${name}`);
          }}
          onBlur={() => {
            setFocused("");
            console.log(`loose focus`);
          }}
          open={openSelect === name}
          onOpen={() => {
            onOpen(name);
          }}
          onClose={onClose}
        />
        <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  /**
   * Creates a checkbox input for the sidebar-menu.
   *
   * Can only be used inside of MenuBaseNode because it uses internal states.
   * @param name
   * @param key
   * @returns
   */
  const createCheckbox = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
        <CheckBoxInput
          key={key}
          name={name}
          value={(layerArgs as any)[name] ? (layerArgs as any)[name] : false}
          setValue={(value: boolean) => {
            setLayerArgs((old) => {
              return { ...old, [name]: value };
            });
          }}
          ref={focused === name ? focusRef : null}
          onFocus={() => {
            setFocused(name);
            console.log(`focus ${name}`);
          }}
        />
        <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  const menuJSX = useMemo(() => {
    return (
      <ArgsMenu>
        {Object.entries(menu).map(([key, val]) => {
          switch (val) {
            case OptionTypes.category:
              return createCategory(key, `${key}-${props.id}`);
            case OptionTypes.text:
              return createText(key, `${key}-${props.id}`);
            case OptionTypes.number:
              return createNumber(key, `${key}-${props.id}`);
            case OptionTypes.boolean:
              return createCheckbox(key, `${key}-${props.id}`);
            case OptionTypes.activation:
              return createSelect(
                key,
                Object.keys(ACTIVATIONS),
                `${key}-${props.id}`
              );
            case OptionTypes.constraint:
              return createSelect(
                key,
                Object.keys(CONSTRAINTS),
                `${key}-${props.id}`
              );
            case OptionTypes.initializer:
              return createSelect(
                key,
                Object.keys(INITIALIZERS),
                `${key}-${props.id}`
              );
            case OptionTypes.regularizer:
              return createSelect(
                key,
                Object.keys(REGULARIZERS),
                `${key}-${props.id}`
              );
          }
        })}
      </ArgsMenu>
    );
  }, [layerArgs, openSelect, focused]);

  return (
    <BaseNode
      {...props}
      menu={menuJSX}
      layerFunction={layerFunction}
      layerTypeName={props.layerTypeName}
    >
      {}
    </BaseNode>
  );
};

export const createMenuBaseNode = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType> => {
  return {
    id: id,
    type: "denseNode",
    position: { x: posX, y: posY },
    dragHandle: ".drag-handle",
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: "dense",
    },
  }; //as Node<DataBaseType>;
};

export default MenuBaseNode;
