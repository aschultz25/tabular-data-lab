// Information about the data:
// https://github.com/fivethirtyeight/data/tree/master/us-weather-history

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

// https://p5js.org/reference/p5/p5.Table/
let weatherTable

let currentRow = 0
let currentColumn = 1

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(400, 400);
  console.log(weatherTable.getRowCount())
  console.log(weatherTable.columns)
  //noLoop()
  //textAlign(CENTER,CENTER)
}

function draw() {
  background(220);
  // weatherTable.getRowCount()
  
  text(weatherTable.getNum(currentRow,currentColumn),width/2,height/2)
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
