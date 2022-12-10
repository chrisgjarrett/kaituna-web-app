import {drawChart} from './line-chart'

// Get parsed json file
jsonData = get_json_from_bucket()

// Set updated field
document.getElementById("lastUpdatedField").innerHTML=jsonData["LastUpdated"]

// Call the chart
drawChart(jsonData)

// Retrieve the data from the bucket
function get_json_from_bucket()
{
    var jsonData = fetch('https://kaituna-data.s3.amazonaws.com/data.json')
    parsedJson = Object.values(jsonData)

    return parsedJson
}