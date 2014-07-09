function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function parseSunHuiOutputFormat(inputLines, outputLines) {
    //we first read from inputLines
    var inputMatrix = [];
    for (var i = 0; i < 6; ++i) {
        var line = inputLines[i].split(/\s+/);
        for (var j = 0; j < 6; ++j)
            line[j] = parseInt(line[j]);
        inputMatrix.push(line);
    }
    var cars = [];
    for (var i = 0; i < 6; ++i)
        for (var j = 0; j < 6; ++j)
            if (inputMatrix[i][j]) {
                var id = inputMatrix[i][j];
                var x = i + 1, y = j + 1;
                var direction;
                var height = 1, width = 1;
                if (inputMatrix[i][j + 1] == id)
                    direction = 0;
                else
                    direction = 1;
                for (var k = 1; j + k < 6 && inputMatrix[i][j + k] == id; ++k) {
                    ++width;
                    inputMatrix[i][j + k] = 0;
                }
                for (var k = 1; i + k < 6 && inputMatrix[i + k][j] == id; ++k) {
                    ++height;
                    inputMatrix[i + k][j] = 0;
                }
                cars[id - 1] = new Car(id, width, height, x, y, getRandomColor());
            }
    var steps = [];
    for (var i = 0; i < outputLines.length; ++i) {
        line = outputLines[i].trim();
        if (line == '')
            continue;
        var a = line.split(' ');
        steps.push(new Step(parseInt(a[0]), (a[1] == 'U' || a[1] == 'L') ? 'backward' : 'forward'));
    }
    var board = new Board(cars);
    return new Replay(steps, document.getElementById('replay-canvas'), board);
}