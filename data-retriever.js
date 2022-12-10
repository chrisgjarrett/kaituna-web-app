// Get parsed json file
jsonData = get_json_from_bucket()

// Set updated field
document.getElementById("lastUpdatedField").innerHTML = 2//jsonData["LastUpdated"]

// Call the chart
drawChart(jsonData)

// Retrieve the data from the bucket
function get_json_from_bucket()
{
    var jsonDataResponse = fetch('https://kaituna-data.s3.amazonaws.com/data.json')
    jsonData = jsonDataResponse.json()

    return jsonData
}

// Draws the line chart
function drawChart(jsonData) {
     
    //Parse json
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
    titleColor = ["black"]
    tickColor = ["black"]
    fontFamily = "test" 
    tickFontScalingFactor = 0.017
    labelFontScalingFactor = 0.014
    titleFontScalingFactor = 0.02

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
                title: {
                    display: true,
                    text: 'Predicted Gate Levels',
                    color: titleColor,
                    font: {
                        size: (ctx) => {

                            return Math.round($(window).innerHeight() * titleFontScalingFactor);
                        }
                    }
                }
            },
            aspectRatio: 2,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return value
                        },
                        color:tickColor,
                        font: {
                            size: (ctx) => {
                                return Math.round($(window).innerHeight() * tickFontScalingFactor);
                            }
                        },
                        precision:0,
                    },
                    title: {
                        display:false,
                        text: 'Gate Level',
                        color:labelColor,
                        font: {
                            size: (ctx) => {
                                return Math.round($(window).innerHeight() * labelFontScalingFactor);
                            }
                        }
                    }
                },
                x: {
                    ticks: {
                        color:tickColor,
                        font: {
                            size: (ctx) => {
                                return Math.round($(window).innerHeight() * tickFontScalingFactor);
                            }
                        }
                    },
                    title: {
                        display:false,
                        text: 'Date',
                        color:labelColor,
                        font: {
                            size: (ctx) => {
                                return Math.round($(window).innerWidth() * labelFontScalingFactor);
                            }
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
