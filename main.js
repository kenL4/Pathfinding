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
}

let graph = [[" ", "O", " ", "#", " "],
            ["#", " ", " ", "#", " "],
            ["X", "#", " ", " ", " "],
            [" ", " ", " ", "#", " "],
            [" ", " ", " ", "#", " "]];

// In the Python version, I used a hashmap but there are no tuples in Javascript
// Therefore I will just check if a spot is ".". This will also save memory space.

let pathFindBFS = function (matrix) {
    //get the starting point
    let startCoord = [0, 0];
    for(i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == "O"){
                startCoord = [i, j];
            }
        }
    }
    console.log(startCoord);
    let queue = new Queue();
    queue.enqueue([startCoord]);
    let path = [];
    while (queue.length() > 0) {
        curr = queue.dequeue();
        console.log(curr[curr.length - 1], (curr[curr.length - 1][0], curr[curr.length - 1][1]));
        //check if the current position is a wall or already visited
        if (matrix[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "." || matrix[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "#") {
            continue;
        }
        //check if we have found a path
        if (matrix[curr[curr.length - 1][0]][curr[curr.length - 1][1]] == "X") {
            path = curr
            break
        }
        if (matrix[curr[curr.length - 1][0]][curr[curr.length - 1][1]] != "O")
            matrix[curr[curr.length - 1][0]][curr[curr.length - 1][1]] = ".";
        let hasleft = curr[curr.length - 1][1] >= 1;
        let hasright = curr[curr.length - 1][1] < graph[0].length - 1;
        let hasbottom = curr[curr.length - 1][0] < graph.length - 1;
        let hastop = curr[curr.length - 1][0] >= 1;
        if (hasleft) {
            let side = Array.from(curr);
            side.push([curr[curr.length - 1][0], curr[curr.length - 1][1] - 1]);
            queue.enqueue(side);
        }
        if (hasleft && hastop) {
            let side1 = Array.from(curr);
            side1.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1] - 1]);
            queue.enqueue(side1);
        }
        if (hasleft && hasbottom) {
            let side2 = Array.from(curr);
            side2.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1] - 1]);
            queue.enqueue(side2);
        }
        if (hasright) {
            let side3 = Array.from(curr);
            side3.push([curr[curr.length - 1][0], curr[curr.length - 1][1] + 1]);
            queue.enqueue(side3);
        }
        if (hasright && hastop) {
            let side4 = Array.from(curr);
            side4.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1] + 1]);
            queue.enqueue(side4);
        }
        if (hasright && hasbottom) {
            let side5 = Array.from(curr);
            side5.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1] + 1]);
            queue.enqueue(side5);
        }
        if (hastop) {
            let side6 = Array.from(curr);
            side6.push([curr[curr.length - 1][0] - 1, curr[curr.length - 1][1]]);
            queue.enqueue(side6);
        }
        if (hasbottom) {
            let side7 = Array.from(curr);
            side7.push([curr[curr.length - 1][0] + 1, curr[curr.length - 1][1]]);
            queue.enqueue(side7);
        }
        for (i = 0; i < matrix.length; i++) {
            console.log(matrix[i]);
        }
    }
    if (path.length > 0){
        for (point = 1; point < path.length - 1; point++) {
            matrix[path[point][0]][path[point][1]] = "+";
        }
        return matrix
    } else {
        return null
    }
};
let pathFound = pathFindBFS(graph);
for (i = 0; i < pathFound.length; i++) {
    console.log(pathFound[i]);
}