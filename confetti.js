var canvas;
var width;
var height;
var r;
var k = 30; 
var grid = [];
var w;
var active = [];
var cols, rows;

function init() {
    width = window.innerWidth;
    height = window.innerHeight + 40;

    canvas = document.getElementById('confetti-canvas');

    canvas.width = width;
    canvas.height = height;

    grid = [];
    active = [];

    r = 180;

    w = r / Math.sqrt(2);

    // STEP 0
    cols = Math.floor(width / w);
    rows = Math.floor(height / w);  
    for (let i = 0; i < cols * rows; i++) {
        grid[i] = -1;
    }

    // STEP 1
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    var i = Math.floor(x / w);
    var j = Math.floor(y / w);
    var pos = [x, y];
    grid[i + j * cols] = pos;
    active.push(pos);

    draw();
}

function draw() {
    // STEP 2
    while (active.length > 0) {
        var randIndex = Math.floor(Math.random() * active.length);
        var pos = active[randIndex];
        var found = false;
        for (let n = 0; n < k; n++) {
            var a = Math.random() * Math.PI * 2;                // Get random angle
            var m = (Math.random() * r) + r;                    // Get random magnitude between r and 2r
            var sample = [(Math.cos(a) * m) + pos[0], (Math.sin(a) * m) + pos[1]];    // Create vector of a * m

            var col = Math.floor(sample[0] / w);
            var row = Math.floor(sample[1] / w);

            if (col >= 0 && row >= 0 && col <= cols && row <= rows && grid[col + row * cols] == -1) {
                var ok = true;
                for (let i = -1; i <= 1; i++) {                
                    for (let j = -1; j <= 1; j++) {      
                        var index = col + i + (row + j) * cols;
                        var neighbor = grid[index];

                        if (neighbor != undefined && neighbor != -1) {
                            var d = Math.sqrt(
                                (neighbor[0] - sample[0]) * (neighbor[0] - sample[0]) +
                                (neighbor[1] - sample[1]) * (neighbor[1] - sample[1]));      // Distance between neighbor and sample

                            if (d < r) {
                                ok = false;
                            }
                        }
                    }
                }
                if (ok) {
                    found = true;
                    grid[col + row * cols] = sample;
                    active.push(sample);

                    break;

                }
            }
        }

        if (!found) {
            active.splice(randIndex, 1);
        }
    }

    var ctx = canvas.getContext('2d');;

    for (let i = 0; i < grid.length; i++) {
        if (grid[i]) {
            ctx.moveTo(grid[i][0], grid[i][1]);
            // ctx.rotate(grid[i][0]);

            switch (Math.floor(Math.random() * 5)) {
                case 1:
                    ctx.fillStyle = "#ffbe0b";
                    break;
                case 2:
                    ctx.fillStyle = "#fb5607";
                    break;
                case 3:
                    ctx.fillStyle = "#ff006e";
                    break;
                case 4:
                    ctx.fillStyle = "#8338ec";
                    break;
                default:
                    ctx.fillStyle = "#3a86ff";
                    break;
            }

            ctx.fillRect(0, 0, 10, 10);
        }
    }
}

document.onload = init();