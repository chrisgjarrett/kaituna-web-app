fetch('data.json')
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        drawChart(json);
    }).catch(function (error) {
        console.error(error);
    });

function drawChart(jsonData) {
    
    //Parse json
    parsedJson = Object.values(jsonData)
    historicalData = jsonData.HistoricalData
    predictedData = jsonData.PredictedData
        
    // Historical / true data
    historicalDates = Object.keys(historicalData)
    historicalValues = Object.values(historicalData)

    // Predicted data
    predictedDates = Object.keys(predictedData)
    predictedValues = Object.values(predictedData)

    // Merging for graph
    var graphLabels = historicalDates.concat(predictedDates)
    var graphData = historicalValues.concat(predictedValues)
    numberOfPredictions = predictedValues.length

    const predictedIndices = (ctx, value) => ctx.p1DataIndex >= graphData.length - numberOfPredictions ? value : undefined;

    // Formatting
    labelSize = 14
    tickSize = 18
    labelColor = ["rgb(100,100,100)"]
    slateGreyColor = ["rgb(105,100,100)"]
    tickColor = ["black"]
    fontFamily = "test" 

    const ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.font.family ='Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    const config =
    {
        type: 'line',
        data: {
            labels: graphLabels,
            datasets: [{
                data: graphData,
                backgroundColor: ['white'],
                label: [""],
                borderColor:["rgb(105,100,100)"],
                segment: {
                    borderColor: (ctx) => predictedIndices(ctx, 'rgb(192,75,75)'),
                    borderDash: (ctx) => predictedIndices(ctx, [6, 6]),
                },
                fill: false
            }]
        },
        options: {
            layout: {
              padding: {
                top: 50
              }
            },
            plugins: {
                legend: false,
            },
            aspectRatio: 2.25,
            scales: {
                y: {
                    ticks: {
                        color:tickColor,
                        font: {
                            size: tickSize,
                        }
                    },
                    title: {
                        display:true,
                        text: 'Gate Level',
                        color:labelColor,
                        font: {
                            size:labelSize,
                        },
                    }
                },
                x: {
                    ticks: {
                        color:tickColor,
                        font: {
                        size: tickSize,
                            }
                    },
                    title: {
                        display:false,
                        text: 'Date',
                        color:labelColor,
                        font: {
                            size:labelSize,
                        }
                    },
                    
                }
            },
            hover: {
            mode: 'index',
            intersect: true,
            },
        }
    }

    const myChart = new Chart(ctx, config);
}