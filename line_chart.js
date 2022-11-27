fetch('/data.json')
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

    const ctx = document.getElementById('myChart').getContext('2d');
    const config =
    {
        type: 'line',
        data: {
            labels: graphLabels,
            datasets: [{
                data: graphData,
                backgroundColor: ['white'],
                label: [""],
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
                    title: {
                        display:true,
                        text: 'Gate Levels'
                    }
                },
                x: {
                    title: {
                        display:false,
                        text: 'Date'
                    }
                }
            },
            ticks: {
                min: 0,
                beginAtZero: true,
            },
            hover: {
            mode: 'index',
            intersect: true
            },
        }
    }

    const myChart = new Chart(ctx, config);
}