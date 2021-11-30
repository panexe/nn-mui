import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { string } from "@tensorflow/tfjs-core";
import { Dispatch, ReactNode, SetStateAction } from "react";
import TextInput from "../../model/layer-info/TextInput";
import { ModelOptions } from "../Train";
import SelectInput from "../../model/layer-info/SelectInput";

interface ModelOptionsTabsProps {
  options: ModelOptions;
  setOptions: Dispatch<SetStateAction<ModelOptions>>;
}

const ModelOptionsTab = ({ options, setOptions }: ModelOptionsTabsProps) => {
  let optimizerElement: ReactNode;
  if (typeof options.optimizer === typeof "string") {
    optimizerElement = (
      <SelectInput
        value={options.optimizer as string}
        setValue={(val: string) => {
          setOptions((old) => ({ ...old, optimizer: val }));
        }}
        ref={null}
        name="optimizer"
        options={["sgd", "momentum", "adagrad", "adadelta", "adam"]}
      />
    );
  } else {
    optimizerElement = (
      <Typography>Currently only string optimizers are supported.</Typography>
    );
  }

  let lossElement = (
    <SelectInput
      name="loss"
      value={options.loss}
      setValue={(val: string) => {
        setOptions((old) => ({ ...old, loss: val }));
      }}
      options={[
        "binaryAccuracy",
        "binaryCrossentropy",
        "categoricalAccuracy",
        "categoricalCrossentropy",
        "cosineProximity",
        "meanAbsoluteError",
        "meanAbsolutePercentageError",
        "meanSquaredError",
        "precision",
        "recall",
      ]}
    />
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      metrics: {
        ...options.metrics,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const metricsElement = (
    <FormControl component="fieldset" variant="standard">
      <FormLabel sx={{ pt: "16px" }} component="legend">
        Metrics
      </FormLabel>
      <FormGroup>
        {Object.entries(options.metrics).map(([key, value]) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: "6px", pl: "9px" }}
                  size="small"
                  checked={value}
                  onChange={handleChange}
                  name={key}
                />
              }
              label={key}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );

  return (
    <Box sx={{ width: "100%", height: "100%", p: "16px" }}>
      <Stack>
        <Typography sx={{ pb: "8px" }} fontSize="18px">
          Model Options
        </Typography>
        <FormLabel sx={{ pt: "16px" }} component="legend">
          Train Parameters
        </FormLabel>

        {optimizerElement}
        {lossElement}
        {metricsElement}
      </Stack>
    </Box>
  );
};

export default ModelOptionsTab;
