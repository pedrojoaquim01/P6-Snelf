import { Box, Grid, Typography } from "@mui/material";

export default function DadosDoPreco({ dataset }) {
  function achaMedia(dataset) {
    var tamDataset = Object.entries(dataset).length;
    console.log(Object.entries(dataset));
    var media = Object.entries(dataset)
      .map((e) => e[1].valorunitariocomercial)
      .reduce((acc, current) => acc + current / tamDataset, 0);
    console.log(media);
    console.log("Estou executando");
    return media.toFixed(2);
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
        <Typography variant="h3" fontWeight="bold">
          {achaMedia(dataset)}
        </Typography>
      </Box>
      <Box p={2} textAlign="center">
        <Typography variant="h4">Moda:</Typography>{" "}
        <Typography variant="h3" fontWeight="bold"></Typography>
      </Box>
      <Box p={2} textAlign="center">
        <Typography variant="h4">Mediana:</Typography>{" "}
        <Typography variant="h3" fontWeight="bold"></Typography>
      </Box>
    </Grid>
  );
}
