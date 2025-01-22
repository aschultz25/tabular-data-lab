// Information about the data:
// https://github.com/fivethirtyeight/data/tree/master/us-weather-history

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

// https://p5js.org/reference/p5/p5.Table/
let weatherTable

//let currentRow = 0
//let currentColumn = 1

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(400, 400)
  noLoop()

}

function draw() {
  background(220);
  
  const temperatures = weatherTable.getColumn("actual_mean_temp").map(Number)
    
   // graph dimensions
  const xSpacing = (width - 100) / temperatures.length
  const yPadding = 50
  const minTemp = Math.min(...temperatures)
  const maxTemp = Math.max(...temperatures)

  
  stroke(0)
  line(50, yPadding, 50, height-yPadding)
  line(50, height - yPadding, width - 50, height - yPadding)
  
  noStroke()
  fill(0)
  textAlign(CENTER)
  textSize(14)
  text("Day of Year", width / 2, height - yPadding / 4)
  textAlign(RIGHT)
  text("Temperature ºF", 40, height / 2)

  textAlign(RIGHT, CENTER)
  text(minTemp, 45, height - yPadding)
  text(maxTemp, 45, yPadding)
  
  noFill()
  stroke(0,100,255)
  stroke(2)
  beginShape()
  for (let i = 0; i < temperatures.length; i++) {
    const x = 50 + i * xSpacing;
    const y = map(temperatures[i], minTemp, maxTemp, height - yPadding, yPadding)
    vertex(x,y)
  }
  endShape()
}
