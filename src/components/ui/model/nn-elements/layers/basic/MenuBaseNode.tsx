// REACT
import React, { useCallback } from "react";
import { useEffect, useMemo, useState } from "react";

// REACT FLOW
import { Node } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer/dist/types";

// MUI
import { CircularProgress, ListItem, Portal, Typography } from "@mui/material";

// NNUI
import { DataBaseType } from "../../../../../../types";
import BaseNode from "./BaseNode";
import TextInput from "../../../layer-info/TextInput";
import SelectInput from "../../../layer-info/SelectInput";
import CheckBoxInput from "../../../layer-info/CheckBoxInput";
import {
  getNNLib,
  ILayer,
  ILayerOutput,
  ILayerPlaceholder,
  INNLayerArgs,
  INNLib,
} from "../../../../../../adapters/INNLib";
import ArgumentFloatCategory from "../../../layer-info/ArgumentFloatCategory";
import { useAppDispatch } from "../../../../../../store";
import { uiActions } from "../../../../../../store/ui";

import * as Comlink from "comlink";
import { LayerArgs } from "@tensorflow/tfjs-layers/dist/engine/topology";

/**
 *
 */
interface MenuBaseProps extends NodeProps<DataBaseType> {
  libName: string;
  layer: ILayer<any, any>;
  layerTypeName: string;
}

/**
 *
 * @param props
 * @returns
 */
const MenuBaseNode = ({
  libName,
  layer,
  layerTypeName,
  ...props
}: MenuBaseProps) => {
  const nnLib = getNNLib(libName);
  const dispatch = useAppDispatch();
  // output-shape string for display on node
  const [outputShape, setOutputShape] = useState("");
  const [layerArgs, setLayerArgs] = useState<typeof layer.initialArgs>(
    layer.initialArgs
  );
  const [loading, setLoading] = useState(false);

  // set args from loaded status
  if (props.data.fromLoad && props.data.layerArgs) {
    setLayerArgs(props.data.layerArgs as INNLayerArgs);
    props.data.fromLoad = false;
  }

  useEffect(() => {
    props.data.changed = true;
    props.data.layerArgs = layerArgs;
    // eslint-disable-next-line
  }, [layerArgs]);

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data.outputValue]);

  /**
   * Gets passed to BaseNode
   * @param input
   * @returns
   */
  const layerFunction = (input: ILayerOutput<any> | undefined) => {
    if (input === undefined) return input;
    setLoading(true);

    const newLayer = layer.create(layerArgs);
    const ret = nnLib.connect(input, newLayer);
    setOutputShape(nnLib.getOutputShape(newLayer));

    setLoading(false);
    return ret as ILayerOutput<any>;
  };


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
      <ListItem
        sx={{ width: "100%", padding: "0", fontWeight: "bold" }}
        key={`fragmet-${key}`}
      >
        <TextInput<string>
          ref={null}
          key={key}
          name={name}
          value={(layerArgs as any)[name] ? (layerArgs as any)[name] : ""}
          setValue={(value: string) => {
            setLayerArgs((old) => {
              return { ...old, [name]: value };
            });
          }}
        />
      </ListItem>
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
          ref={null}
        />
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
          ref={null}
        />
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
          ref={null}
        />
      </React.Fragment>
    );
  };

  const menuJSX = useMemo(() => {
    return (
      <>
        {layer.menu.categories.map((cat) => (
          <ArgumentFloatCategory
            name={cat.categoryName}
            key={`arg-float-category-${props.id}-${cat}`}
          >
            {cat.values.map((val) => {
              switch (val.type.type) {
                case "category":
                  return createCategory(val.name, `${val.name}-${props.id}`);
                case "string":
                  return createText(val.name, `${val.name}-${props.id}`);
                case "number":
                  return createNumber(val.name, `${val.name}-${props.id}`);
                case "boolean":
                  return createCheckbox(val.name, `${val.name}-${props.id}`);
                case "select":
                  return createSelect(
                    val.name,
                    val.type.options,
                    `${val.name}-${props.id}`
                  );
                default:
                  return <p>ERROR: unknown value</p>;
              }
            })}
          </ArgumentFloatCategory>
        ))}
      </>
    );
    // eslint-disable-next-line
  }, [layerArgs]);

  const containerLoading = document.getElementById("loading-portal");
  return (
    <>
      {loading && (
        <Portal container={containerLoading}>
          <CircularProgress size={24} />
        </Portal>
      )}
      <BaseNode
        {...props}
        lib={nnLib}
        menu={menuJSX}
        layerFunction={layerFunction}
        layerTypeName={layerTypeName}
      >
        {outputShape}
      </BaseNode>
    </>
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
      libName: "tensorflow",
      isDragged: false,
      dragOffset: 0,
    },
  }; //as Node<DataBaseType>;
};

export default MenuBaseNode;
