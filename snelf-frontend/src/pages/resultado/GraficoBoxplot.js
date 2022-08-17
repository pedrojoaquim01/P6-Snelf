import ReactApexChart from "react-apexcharts";
import React from "react";

export default function GraficoBoxPlot({ dataset }) {
  //MOCK: dados para o boxplot
  const series = [
    {
      type: "boxPlot",
      data: [
        {
          x: "Jan 2018",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Fev 2018",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Mar 2018",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Abr 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Maio 2018",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jun 2018",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jul 2018",
          y: [54, 59, 66, 71, 88],
        },
        {
          x: "Ago 2018",
          y: [54, 59, 66, 71, 88],
        },
        {
          x: "Set 2018",
          y: [54, 59, 66, 71, 88],
        },
        {
          x: "Out 2018",
          y: [54, 59, 66, 71, 88],
        },
        {
          x: "Nov 2018",
          y: [54, 59, 66, 71, 88],
        },
        {
          x: "Dez 2018",
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
      text: "Preço para o produto Dipirona de 1/1/2018 até 30/12/2018",
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
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="boxPlot"
      height={600}
    />
  );
}
