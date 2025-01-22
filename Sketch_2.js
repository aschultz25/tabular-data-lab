// Information about the data:
// https://github.com/fivethirtyeight/data/tree/master/us-weather-history

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

// https://p5js.org/reference/p5/p5.Table/
let weatherTable
let subset = "January"
let curentSubsetData = []
let subsets = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentSubsetIndex = 0

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(400, 400);
  noLoop()
  textAlign(CENTER,CENTER)

  filterDataForSubset()
}

function draw() {
  background(220);

  //title
  textSise(16)
  fill(0)
  text('Average Temperatures for ${subset}', width / 2, 30)

  stroke(0)
  line(50, 50, 50, height - 50)
  line(50, height - 50, width - 50, height - 50)

  const temperatures = currentSubsetData.map( row => Number(row.get("actual_mean_temp")))
  const minTemp = Math.min(...temperatures)
  const maxTemp = Math.max(...temperatures)
  
  const xSpacing = (width - 100) / temperatures.length
  const yPadding = 50

  stroke(0, 100, 255)
  strokeWeight(2)
  noFill()
  beginShape()
  for (let i = 0; i < temperatures.length; i++) {
    const x = 50 + i * xSpacing
    const y = map(temperatures[i], minTemp, maxTemp, height - yPadding, yPadding)
    vertex(x,y)
  }
  endShape()

  noStroke()
  fill(0)
  textAlign(RIGHT, CENTER)
  text(minTemp, 45, height - 50)
  text(maxTemp, 45, 50) 
}

function keyPressed() {
  if( keyCode === DOWN_ARROW ) {
    currentRow++
    
    redraw()
  }
  if( keyCode === RIGHT_ARROW ) {
    currentColumn++
    if( currentColumn >= weatherTable.getColumnCount() ) {
      currentColumn = 1
    }
    redraw()
  }
}
