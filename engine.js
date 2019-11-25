var totalCities = 6;

var cities = [];

var order = [];
var bestOrder;
var bestDistance = Infinity;

var numberOfPossiblePermutations;
var permutationsCount = 0;

function setup() {
    createCanvas(600, 600);
    
    for (var i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height)/2); // -> a point in the canvas
        order[i] = i;
    }

    // -> for the text label, lexical algorithm is a factorial of possibilities
    numberOfPossiblePermutations = factorial(totalCities);
}

function draw() {
    // -> CALCULATION/COMPUTATION

    // -> get the current distance
    var d = calcDistance(cities, order);
    if (d < bestDistance) {
        bestDistance = d;
        bestOrder = order.slice();
    }

    // -> run lexical order
    nextOrder();



    // -> RENDER/PRINT RESULTS
    //frameRate(5);
    background(0);

    // -> text with the percentage of the process
    var percent = 100 * (permutationsCount / numberOfPossiblePermutations);
    textSize(14);
    fill(255);
    noStroke();
    text(nf(percent, 0, 2) + "% completed", 10, 20);

    // -> cities elipses
    fill(255);
    for (var i = 0; i < cities.length; i++) 
        ellipse(cities[i].x, cities[i].y, 8, 8);
    
    // -> lines for best order
    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < bestOrder.length; i++) {
        var n = bestOrder[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();

    // -> lines for current order
    translate(0, height / 2);
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < order.length; i++) {
        var n = order[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();
}

function calcDistance(points, order) {
    var sum = 0;

    for (var i = 0; i < order.length - 1; i++) {
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = points[cityBIndex];
        
        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }

    return sum;
}

function swap(sourceArray, i, j) {
    var temp = sourceArray[i];
    sourceArray[i] = sourceArray[j];
    sourceArray[j] = temp;
}

function factorial(n) {
    if (n == 1) 
        return 1;

    return n * factorial(n - 1);
}

// -> Lexical Algorithm
function nextOrder() {
    permutationsCount++;
  
    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) 
        if (order[i] < order[i + 1]) 
            largestI = i;

    if (largestI == -1) // -> finished
      noLoop();
  
    // STEP 2
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) 
        if (order[largestI] < order[j]) 
            largestJ = j;
  
    // STEP 3
    swap(order, largestI, largestJ);
  
    // STEP 4: reverse from largestI + 1 to the end
    var endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);
}