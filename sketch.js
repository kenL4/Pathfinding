class Rect {
    constructor(x, y, colour) {
        this.colour = colour
        this.x = x
        this.y = y
    }
    setColour(colour) {
        this.colour = colour
    }
    show () {
        fill(this.colour)
        rect(x*(window.innerWidth/2.54/10), y*(window.innerHeight/1.24/10), (window.innerWidth/2.54/10), (window.innerHeight/1.24/10))
    }
}
class Queue {
    constructor() {
        this.array = [];
    }
    enqueue(x){
        var x = x;
        this.array.push(x);
        return;
    }
    dequeue(){
        return this.array.shift();
    }
    length() {
        return this.array.length;
    }
    print() {
        console.log(this.array);
    }
    clear() {
        this.array = [];
    }
}
var type = 0;
var bfs = false;
var queue = new Queue();
var path = null;
var mode = null;
function setup() {
    let canv = createCanvas(window.innerWidth/2.54, window.innerHeight/1.24)
    canv.center("horizontal");
    canv.mousePressed(canvMousePressed);
    buttonRun = createButton("Run")
    buttonRun.position(0,0)
    buttonRun.mousePressed(callBFS)
    buttonClear = createButton("Clear")
    buttonClear.position(0,20)
    buttonClear.mousePressed(clearPen)
    buttonWall = createButton("Wall")
    buttonWall.position(0,40)
    buttonWall.mousePressed(wallPen)
    buttonStart = createButton("Start Point")
    buttonStart.position(0,60)
    buttonStart.mousePressed(startPen)
    buttonEnd = createButton("End Point")
    buttonEnd.position(0,80)
    buttonEnd.mousePressed(goalPen)
    mode = createP(("Drawing mode: " + String(type)), window.innerWidth/2, window.innerHeight/2);
    mode.center("horizontal")
}
function draw() {
    background(220)
    drawMatrix(graph)
    //mode.html("Drawing mode: " + String(type))
    if (bfs && queue.length() > 0){
        if (!path){
            pathFindBFS()
        }else{
            for (i = 1; i < path.length - 1; i++) {
                graph[path[i][0]][path[i][1]] = "+"
            }
            queue.clear();
            bfs = false;
        }
    }
}
function callBFS() {
    let startCoord = [0, 0];
    for(i = 0; i < graph.length; i++) {
        for (j = 0; j < graph[i].length; j++) {
            if (graph[i][j] == "O"){
                startCoord = [i, j];
            }
        }
    }
    queue.enqueue([startCoord]);
    bfs = true;
}

function canvMousePressed() {
    switch (type) {
        case 1:
            //mouseX mouse Y
            x = (mouseX - (mouseX % 75)) / 75
            y = (mouseY - (mouseY % 75)) / 75
            graph[y][x] = "#"
            break;
        case 2:
            x = (mouseX - (mouseX % 75)) / 75
            y = (mouseY - (mouseY % 75)) / 75
            for (i = 0; i < graph.length; i++) {
                for (j = 0; j < graph[0].length; j++) {
                    if (graph[i][j] == "O")
                        graph[i][j] = " ";
                }
            }
            graph[y][x] = "O"
            break;
        case 3:
            x = (mouseX - (mouseX % 75)) / 75
            y = (mouseY - (mouseY % 75)) / 75
            for (i = 0; i < graph.length; i++) {
                for (j = 0; j < graph[0].length; j++) {
                    if (graph[i][j] == "X")
                        graph[i][j] = " ";
                }
            }
            graph[y][x] = "X"
            break;
        default:
            x = (mouseX - (mouseX % 75)) / 75
            y = (mouseY - (mouseY % 75)) / 75
            graph[y][x] = " "
            break;
    }
}

function pathFindBFS () {
    curr = queue.dequeue();
    //check if the current position is a wall or already visited
    if (graph[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "." || graph[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "#")
        return
    //check if we have found a path
    if (graph[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "X") {
        path = curr
        return
    }
    if (graph[curr[curr.length - 1][0]][curr[curr.length - 1][1]] != "O")
        graph[curr[curr.length - 1][0]][curr[curr.length - 1][1]] = ".";
    let hasleft = curr[curr.length - 1][1] >= 1;
    let hasright = curr[curr.length - 1][1] < graph[0].length - 1;
    let hasbottom = curr[curr.length - 1][0] < graph.length - 1;
    let hastop = curr[curr.length - 1][0] >= 1;
    if (hasleft) {
        if (graph[curr[curr.length - 1][0]][curr[curr.length - 1][1] - 1] == " ")
            graph[curr[curr.length - 1][0]][curr[curr.length - 1][1] - 1] = "-";
        let side = Array.from(curr);
        side.push([curr[curr.length - 1][0], curr[curr.length - 1][1] - 1]);
        queue.enqueue(side);
    }
    if (hasleft && hastop) {
        if (graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1] - 1] == " ")
            graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1] - 1] = "-";
        let side1 = Array.from(curr);
        side1.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1] - 1]);
        queue.enqueue(side1);
    }
    if (hasleft && hasbottom) {
        if (graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] - 1] == " ")
            graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] - 1] = "-";
        let side2 = Array.from(curr);
        side2.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1] - 1]);
        queue.enqueue(side2);
    }
    if (hasright) {
        if (graph[curr[curr.length - 1][0]][curr[curr.length - 1][1] + 1] == " ")
            graph[curr[curr.length - 1][0]][curr[curr.length - 1][1] + 1] = "-";
        let side3 = Array.from(curr);
        side3.push([curr[curr.length - 1][0], curr[curr.length - 1][1] + 1]);
        queue.enqueue(side3);
    }
    if (hasright && hastop) {
        if (graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1] + 1] == " ")
            graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1] + 1] = "-";
        let side4 = Array.from(curr);
        side4.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1] + 1]);
        queue.enqueue(side4);
    }
    if (hasright && hasbottom) {
        if (graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] + 1] == " ")
            graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] + 1] = "-";
        let side5 = Array.from(curr);
        side5.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1] + 1]);
        queue.enqueue(side5);
    }
    if (hastop) {
        if (graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1]] == " ")
            graph[curr[curr.length - 1][0] - 1][curr[curr.length - 1][1]] = "-";
        let side6 = Array.from(curr);
        side6.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1]]);
        queue.enqueue(side6);
    }
    if (hasbottom) {
        if (graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] - 1] == " ")
            graph[curr[curr.length - 1][0] + 1][curr[curr.length - 1][1] - 1] = "-";
        let side7 = Array.from(curr);
        side7.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1]]);
        queue.enqueue(side7);
    }
};

var graph = [[" ", "", " ", "#", " ", " ", "O", " ", " ", "#"],
                [" ", "#", " ", "#", "#", " ", " ", " #", "#", "#"],
                ["X", "#", " ", "#", " ", " ", " ", " ", " ", "#"],
                [" ", " ", " ", "#", " ", " ", "#", " ", " ", "#"],
                [" ", "#", " ", " ", " ", "#", "#", " ", " ", "#"],
                [" ", "#", " ", "#", " ", " ", "#", " ", " ", "#"],
                [" ", " ", " ", "#", " ", " ", "#", " ", " ", "#"],
                [" ", " ", " ", " ", " ", "#", "#", " ", " ", "#"],
                ["#", "#", " ", "#", " ", " ", "#", " ", " ", "#"],
                ["#", " ", " ", "#", " ", " ", "#", " ", "#", "#"]];

function drawMatrix(graph) {
    for (i = 0; i < graph.length; i++) {
        for (j = 0; j < graph[0].length; j++) {
            switch (String(graph[i][j])) {
                case "#":
                    fill("blue")
                    break;
                case ".":
                    fill("green")
                    break;
                case "X":
                    fill("red")
                    break;
                case "O":
                    fill("magenta")
                    break;
                case "+":
                    fill("cyan")
                    break;
                case "-":
                    fill("yellow")
                    break;
                default:
                    fill("grey")
                    break;
            }
            rect(j*75, i*75, 75, 75)
        }
    }
}
function windowResized() {
    resizeCanvas(window.innerWidth/2.54, window.innerHeight/1.24);
}
function wallPen() {
    type = 1;
}
function startPen() {
    type = 2;
}
function goalPen() {
    type = 3;
}
function clearPen() {
    type = 0;
}