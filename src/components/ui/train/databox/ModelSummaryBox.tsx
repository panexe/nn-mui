import { Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import NetworkIcon from "../../../icons/NetworkIcon/NetworkIcon";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(line: string) {
  const segments = line.split(" ");
  if (segments.length < 4) {
    throw new Error(
      `Line must include 4 whitespace-seperated strings. Got: ${line}`
    );
  }
  let cleanSegments = segments.filter((val) => val !== "");

  return {
    layer: cleanSegments[0] + cleanSegments[1],
    output: cleanSegments[2],
    params: cleanSegments[3],
  };
}

const ModelSummaryBox = () => {
  const theme = useTheme();

  const summary = useSelector<RootState>(
    (state) => state.model.currentModelSummary
  ) as string;

  const summaryLines = summary.split("\n");
  let sumStart = 0;
  let sumEnd = summaryLines.length;
  for (var i = 0; i < summaryLines.length; i++) {
    if (sumStart === 0 && summaryLines[i][0] === "=") {
      sumStart = i + 1;
      continue;
    }
    console.log(i, ": ", summaryLines[i][0]);
    if (summaryLines[i][0] === "=") {
      sumEnd = i - 1;
      break;
    }
  }

  console.log("start, end", sumStart, sumEnd);
  console.log(summaryLines);
  const subSum = summaryLines
    .slice(sumStart, sumEnd)
    .filter((val) => val[0] !== "_");

  console.log(subSum);

  const rows = subSum.map((val) => createData(val));

  console.log(rows);

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: "16px",
        p: "12px",
        pl: "20px",
        overflowY: 'auto'
      }}
      elevation={1}
    >
      <Stack direction="row" spacing="16px" sx={{ mb: "8px" }}>
        <NetworkIcon fill={theme.palette.text.primary} />
        <Typography variant="h6">Model Summary</Typography>
      </Stack>
      {rows.length !== 0 && (
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Layer (type)</TableCell>
              <TableCell align="left">Output shape</TableCell>
              <TableCell align="left">Param #</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.layer}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.layer}
                </TableCell>
                <TableCell align="left">{row.output}</TableCell>
                <TableCell align="left">{row.params}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {rows.length === 0 && <Typography>No summary available.</Typography>}
    </Paper>
  );
};

export default ModelSummaryBox;
