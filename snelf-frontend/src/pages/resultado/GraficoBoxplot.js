import ReactApexChart from "react-apexcharts";
import React from "react";
import { calculaMediana } from "./dispertionFunctions";

function calculaSeriePorMes(mesDesejado, dataset) {
  let cleanDataset = Object.entries(dataset)
    .filter((e) => {
      let data = e[1].DataEmissao;
      let mes = data[5] + data[6];
      if (mes === mesDesejado) {
        return true;
      }else{
        return false;
      }
    })
    .map((e) => e[1].valorunitariocomercial);

  let mediana = calculaMediana(cleanDataset).toFixed(2);
  console.log(mediana)

  let minimo = cleanDataset.reduce((a, b) => {
    return Math.min(a, b);
  });

  let maximo = cleanDataset.reduce((a, b) => {
    return Math.max(a, b);
  });

  let datasetq1 = cleanDataset.filter((e) => e < mediana);
  console.log(datasetq1)
  let q1 = calculaMediana(datasetq1);


  let datasetq3 = cleanDataset.filter((e) => e > mediana);
  let q3 = calculaMediana(datasetq3);

  return [minimo, q1, mediana, q3, maximo];
}

function geraSeries(dataset) {
  return [
    {
      type: "boxPlot",
      data: [
        {
          x: "Jan 2018",
          y: calculaSeriePorMes("01", dataset),
        },
        {
          x: "Fev 2018",
          y: calculaSeriePorMes("02", dataset),
        },
        {
          x: "Mar 2018",
          y: calculaSeriePorMes("03", dataset),
        },
        {
          x: "Abr 2018",
          y: calculaSeriePorMes("04", dataset),
        },
        {
          x: "Maio 2018",
          y: calculaSeriePorMes("05", dataset),
        },
        {
          x: "Jun 2018",
          y: calculaSeriePorMes("06", dataset),
        },
        {
          x: "Jul 2018",
          y: calculaSeriePorMes("07", dataset),
        },
        {
          x: "Ago 2018",
          y: calculaSeriePorMes("08", dataset),
        },
        {
          x: "Set 2018",
          y: calculaSeriePorMes("09", dataset),
        },
        {
          x: "Out 2018",
          y: calculaSeriePorMes("10", dataset),
        },
        {
          x: "Nov 2018",
          y: calculaSeriePorMes("11", dataset),
        },
        {
          x: "Dez 2018",
          y: calculaSeriePorMes("12", dataset),
        },
      ],
    },
  ];
}

export default function GraficoBoxPlot({ dataset }) {
  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
    },
    title: {
      text: "Preço para o produto Dipirona de 1/1/2018 até 30/12/2018",
      align: "left",
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#0069fa",
          lower: "#4dabf5",
        },
      },
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={geraSeries(dataset)}
      type="boxPlot"
      height={600}
    />
  );
}
