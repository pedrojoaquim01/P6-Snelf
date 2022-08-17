import { Box, Grid, Typography } from "@mui/material";
import {calculaMediana, calculaModa} from "./dispertionFunctions";

export default function DadosDoPreco({ dataset }) {

  function achaMedia(dataset) {
    var tamDataset = Object.entries(dataset).length;
    var media = Object.entries(dataset)
      .map((e) => e[1].valorunitariocomercial)
      .reduce((acc, current) => acc + current / tamDataset, 0);
    return media.toFixed(2);
  }

  function achaMediana(dataset) {
    var arr = Object.entries(dataset)
      .map((e) => e[1].valorunitariocomercial);
    var mediana = calculaMediana(arr);
    return mediana.toFixed(2);
  }

  function achaModa(dataset) {
    var arr = Object.entries(dataset)
      .map((e) => e[1].valorunitariocomercial);
    var moda = calculaModa(arr);
    return moda.toFixed(2);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      rowSpacing={1}
      alignItems="center"
    >
      <Box p={2} textAlign="center">
        <Typography variant="h8">
          Os dados estatísticos totais sobre a variável preço na busca foram
        </Typography>
      </Box>
      <Box p={2} textAlign="center">
        <Typography variant="h4">Média:</Typography>{" "}
        <Typography variant="h3" fontWeight="bold">{achaMedia(dataset)}</Typography>
      </Box>
      <Box p={2} textAlign="center">
        <Typography variant="h4">Moda:</Typography>{" "}
        <Typography variant="h3" fontWeight="bold">{achaModa(dataset)}</Typography>
      </Box>
      <Box p={2} textAlign="center">
        <Typography variant="h4">Mediana:</Typography>{" "}
        <Typography variant="h3" fontWeight="bold">{achaMediana(dataset)}</Typography>
      </Box>
    </Grid>
  );
}
