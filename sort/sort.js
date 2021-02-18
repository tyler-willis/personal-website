var array = [];
var size;
var speed = 200;
var chartH = 600;
var chartW = 1200;
var widthUnit;
var heightUnit;

function setSpeed() {
    var speeds = document.getElementsByName("speed");
    for (let i = 0; i < speeds.length; i++) {
        if (speeds[i].checked) {
            speed = speeds[i].value;
        }
    }
}

function init() {
    if (document.getElementById("size")) {
        size = document.getElementById("size").value;
    } else {
        size = 10;
    }

    heightUnit = chartH / size;
    widthUnit = chartW / size;

    var chart = document.getElementById("chart");

    // Set Chart Size
    chart.style.width = chartW + "px";
    chart.style.height = chartH + "px";

    // Remove any old bars
    while(chart.firstChild) {
        chart.removeChild(chart.firstChild);
    }

    // Clear array
    array = [];

    // Add new bars
    for (let i = 1; i <= size; i++) {
        var span = document.createElement("span");
        span.id = ("p" + (i));
        span.style.width = "" + widthUnit + "px";
        span.style.height = "" + (i * heightUnit) + "px";
        
        chart.append(span);

        array.push(i);
    }

    setColors()

    draw();
}

function setColors() {
    var spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; i++) {
        if (document.getElementById("colored").checked) {
            // Color Gradient
            // spans[i].style.backgroundImage = "linear-gradient(to right, " + getColor(i / size) + ", " + getColor((i + 1) / size) + ")";

            // Color Blocks
            spans[i].style.backgroundColor = getColor(i / size);
        } else {
            spans[i].style.backgroundColor = "#222";
            // spans[i].style.backgroundImage = "linear-gradient(to right, black, black)";
        }
    }
}

function getColor(value) {
    var red = 0, green = 0, blue = 0;
    if (value < (1/6)) {
        red = 255;
        green = value * 255 * 6;
        blue = 0;
    } else if (value < (2/6)) {
        red = 255 - ((value - 1/6) * 255 * 6);
        green = 255;
        blue = 0;
    } else if (value < (3/6)) {
        red = 0;
        green = 255;
        blue = (value - 2/6) * 255 * 6;
    } else if (value < (4/6)) {
        red = 0;
        green = 255 - (value - 3/6) * 255 * 6;
        blue = 255;
    } else if (value < (5/6)) {
        red = (value - 4/6) * 255 * 6;
        green = 0;
        blue = 255;
    } else {
        red = 255;
        green = 0;
        blue = 255 - (value - 5/6) * 255 * 6;
    }

    var output = "rgb(" + red + ", " + green + ", " + blue + ")";
    return(output);
}

function draw() {
    for (let i = 0; i < array.length; i++) {
        var id = "p" + array[i];
        document.getElementById(id).style.transform = "translate(" + (widthUnit * i) + "px)";
    }
}

function freezeControls(off) {
    var buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        if (off) {
            buttons[i].disabled = true;
        } else {
            buttons[i].disabled = false;
        }
    }
}

function shuffle() {
    var m = array.length, t, i;
    step();

    function step() {
        if (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;

            // Animate
            draw();
            setTimeout(step, 50);
        }
    }
}

function bubbleSort() {
    var sorted = false;

    step();

    function step() {
        if (!sorted) {
            sorted = true;

            for(let i = 0; i < array.length - 1; i++ ) {
                if (array[i] > array[i + 1]) {
                    // Swap
                    var temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
    
                    sorted = false;
                }
            }
        }

        // Animate
        draw();
        setTimeout(step, speed);
    }
}

function selectionSort() {
    var top = array.length - 1;

    step();

    function step() {
        if (top > 0) {
            var highest = 0;

            for (let i = 0; i <= top; i++) {
                if (array[i] > array[highest]) {
                    highest = i;
                }
            }

            // Swap top with highest
            var temp = array[top];
            array[top] = array[highest];
            array[highest] = temp;

            top--;

            // Animate
            draw();
            setTimeout(step, speed);
        }
    }
}

function insertionSort() {
    var i = 1, j = 0; k = 0;
    step();

    function step() {
        if (i < array.length) {
            k = array[i];
            j = i - 1;

            while (j >= 0 && array[j] > k) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = k;
        }

        i++;

        // Animate
        draw();
        setTimeout(step, speed);
    }
}

function mergeSort() {

    split(0, array.length - 1);

    // l => left, r => right
    function split(l, r) {
        if (l >= r) {
            return;
        }
        // m => midpoint between l and r
        var m = Math.floor(l + (r - l) / 2);
        split(l, m);
        split(m + 1, r);
        merge(l, m, r);
    }

    function merge(l, m, r) {
        // Sub arrays, array left and array right
        var al = [], ar = [];

        for (let i = l; i <= r; i++) {
            if (i <= m) {
                al.push(array[i]);
            } else {
                ar.push(array[i]);
            }
        }

        // Merge al and ar

        
    }
}

init();

const sizePicker = document.getElementById("size");
sizePicker.addEventListener("change", (event) => {
    init();
});

const colorCheckBox = document.getElementById("colored");
colorCheckBox.addEventListener("change", (event) => {
    setColors();
});











// function cocktailShakerSort() {
//     var top = array.length - 1;
//     var bottom = 0;
//     var goingUp = true;

//     step();

//     function step() {
//         if (top > bottom) {
//             if (goingUp) {
//                 var highest = bottom;

//                 for (let i = bottom; i <= top; i++) {
//                     if (array[i] > array[highest]) {
//                         highest = i;
//                     }
//                 }

//                 // Swap top with highest
//                 var temp = array[top];
//                 array[top] = array[highest];
//                 array[highest] = temp;

//                 goingUp = false;
//                 top--;
//             } else {
//                 var lowest = top;

//                 for (let i = top; i >= bottom; i--) {
//                     if (array[i] < array[lowest]) {
//                         lowest = i;
//                     }
//                 }

//                 // Swap top with highest
//                 var temp = array[bottom];
//                 array[bottom] = array[lowest];
//                 array[lowest] = temp;

//                 goingUp = true;
//                 bottom++;
//             }

//             draw();
//             setTimeout(step, speed);
//         }
//     }
// }

// function topAndBottomSort() {
//     var top = array.length - 1;
//     var bottom = 0;

//     step();

//     function step() {
//         if (top > bottom) {
//             var highest = 0;
//             var lowest = top;

//             for (let i = bottom; i <= top; i++) {
//                 if (array[i] > array[highest]) {
//                     highest = i;
//                 }

//                 if (array[i] < array[lowest]) {
//                     lowest = i;
//                 }
//             }

//             // Swap top with highest
//             var temp = array[top];
//             array[top] = array[highest];
//             array[highest] = temp;

//             // Swap bottom with Lowest
//             temp = array[bottom];
//             array[bottom] = array[lowest];
//             array[lowest] = temp;

//             top--;
//             bottom++;

//             draw();
//             setTimeout(step, speed);
//         }
//     }
// }