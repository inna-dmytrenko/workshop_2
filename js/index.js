const ctx = document.querySelector('.js-chart').getContext('2d')
const GLOBAL_MEAN_TEMPERATURE = 14

fetchData()
  .then(parseData)
  .then(getLabelsAndData)
  .then(({ years, temps, temps2, temps3 }) =>
    drawChart(years, temps, temps2, temps3),
  )

function fetchData() {
  return fetch('./ZonAnn.Ts+dSST.csv').then((response) => response.text())
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year + 'г.')
      acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE)
      acc.temps2.push(Number(entry.c) + GLOBAL_MEAN_TEMPERATURE)
      acc.temps3.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE)

      return acc
    },
    { years: [], temps: [], temps2: [], temps3: [] },
  )
}
// function getLabelsAndData2(data) {
//   return data.reduce(
//     (acc, entry) => {
//       acc.years.push(entry.Year + 'г.')
//       acc.temps.push(Number(entry.c) + GLOBAL_MEAN_TEMPERATURE)

//       return acc
//     },
//     { years: [], temps: [] },
//   )
// }

function drawChart(labels, data, data2, data3) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '# Среднемесячный глобальный показатель',
          data,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: true,
        },
        {
          label: '# Средняя c температура',
          data: data2,
          borderColor: 'green',
          borderWidth: 2,
          fill: false,
        },
        {
          label: '# Средняя температура',
          data: data3,
          borderColor: 'navy',
          borderWidth: 2,
          fill: false,
        },
      ],
    },

    options: {
      // scales: {
      //   y: {
      //     ticks: {
      //       // Include a dollar sign in the ticks
      //       callback: function (value, index, values) {
      //         return value + '°'
      //       },
      //     },
      //   },
      // },
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  })
  console.log(data)
  console.log(data2)
}

// function fetchData() {
//   fetch('./ZonAnn.Ts+dSST.csv')
//     .then((response) => response.text())
//     .then((data) => {
//       const parsedData = Papa.parse(data, { header: true }).data

//       const mappedDana = parsedData.reduce(
//         (acc, entry) => {
//           acc.years.push(entry.Year)
//           acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE)

//           return acc
//         },
//         { years: [], temps: [] },
//       )

//       // const years = parsedData.map((entry) => entry.Year)
//       // const temps = parsedData.map(
//       //   (entry) => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE,
//       // )

//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels,
//           datasets: [
//             {
//               label: '# Средняя глобальная температура',
//               data,
//               borderColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   callback(value) {
//                     return value + '°'
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       })
//     })
// }

// fetchData()

// // var results = Papa.parse(csvString, config)
