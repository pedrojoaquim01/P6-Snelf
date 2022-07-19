import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import ReactApexChart from "react-apexcharts";
import { DataGrid } from '@mui/x-data-grid';
import dadosProdutos from "../dados_mock_produtos.json"


export default function Resultado() {
  //função que retorna a página a ser exibida na tela, tendo como base a opção selecionada na barra superior
  const getResultPage = (selectedPageId) => {
    if (selectedPageId === 1) {
      // gráfico da variável preço no tempo
      return (
        <ReactApexChart
          options={options}
          series={series}
          type="boxPlot"
          height={600}
        />
      );
    } else if (selectedPageId === 2) {
      //página com os dados da variável preço no tempo
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
              14.56
            </Typography>
          </Box>
          <Box p={2} textAlign="center">
            <Typography variant="h4">Moda:</Typography>{" "}
            <Typography variant="h3" fontWeight="bold">
              10.10
            </Typography>
          </Box>
          <Box p={2} textAlign="center">
            <Typography variant="h4">Mediana:</Typography>{" "}
            <Typography variant="h3" fontWeight="bold">
              35.90
            </Typography>
          </Box>
        </Grid>
      );
    } else if (selectedPageId === 3) {
      return (
        <DataGrid
          rows={dadosProdutos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
        />
      );
    } else {
      return <div></div>;
    }
  };

  //MOCK: dados para o boxplot
  const series = [
    {
      type: "boxPlot",
      data: [
        {
          x: "Jan 2015",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Jan 2016",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Jan 2017",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Jan 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Jan 2019",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jan 2020",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jan 2021",
          y: [54, 59, 66, 71, 88],
        },
      ],
    },
  ];
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
    },
    title: {
      text: "Preço para o produto X de Janeiro 2015 até Janeiro 2021",
      align: "left",
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#1769aa",
          lower: "#4dabf5",
        },
      },
    },
  };

  //MOCK: colunas da tabela de compras
  const columns = [
    { field: 'nome', headerName: 'Nome', width: 450},
    { field: 'preco', headerName: 'Valor de Compra', width: 200},
    { field: 'ean', headerName: 'EAN', width: 200},
    { field: 'dataDeCompra', headerName: 'Data da Compra', width: 200}
  ];

  //variável que controla a barra de seleção, e consequentemente qual página está sendo exibida
  const [selectedPageId, setSelectedPageId] = React.useState(1);
  const selectPageById = (event, newSelectedPageId) => {
    setSelectedPageId(newSelectedPageId);
  };

  return (
    <div>
      <Navbar />
      <Box p={{ xs: 8, sm: 6, md: 9 }} height="80vh" width="80%" m="auto">
        <Box>
          {/* Título */}
          <Grid
            container
            spacing={0}
            direction="column"
            rowSpacing={1}
            alignItems="center"
          >
            <Box pb={1} textAlign="center">
              <Typography variant="h3">Resultado</Typography>
            </Box>

            <Box pt={2} pb={4} textAlign="center">
              <Typography variant="h8">
                Resultado da busca pelo produto X
              </Typography>
            </Box>
          </Grid>
        </Box>

        {/* Page Selector */}
        <Box
          sx={{
            width: "100%",
            marginBottom: "5%",
            bgcolor: "background.paper",
          }}
        >
          <Tabs value={selectedPageId} onChange={selectPageById} centered>
            <Tab label="Gráfico da variável preço" value={1} />
            <Tab label="Dados da variável preço" value={2} />
            <Tab label="Lista de compras" value={3} />
          </Tabs>
        </Box>

        {/* Resultado */}
        <Box pb={10} height="80vh" width="100%" m="auto">
          {getResultPage(selectedPageId)}
        </Box>
      </Box>
    </div>
  );
}
