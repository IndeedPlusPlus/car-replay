function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function QingBiaoParser(initialPosition, exitPosition, stepsOutput) {
    var cars = [];
    for (var i = 0; i < initialPosition.length; ++i) {
        var s = initialPosition[i];
        var a = s.split(',');
        cars.push(
            new Car(i + 1, parseInt(a[3]) ? 1 : parseInt(a[0]), parseInt(a[3]) ? parseInt(a[0]) : 1, parseInt(a[1]), parseInt(a[2])
                , getRandomColor()
            )
        );
    }
    var steps = [];
    for (var i = 0; i < stepsOutput.length; ++i) {
        var s = stepsOutput[i];
        var a = s.split(' ');
        for (var j = 0; j < parseInt(s[2]); ++j)
            steps.push(new Step(parseInt(a[0]), parseInt(a[1]) ? 'backward' : 'forward'));
    }
    var board = new Board(cars);
    var replay = new Replay(steps, document.getElementById('replay-canvas'), board);
    var a = exitPosition.split(',');
    replay.exitX = parseInt(a[0]);
    replay.exitY = parseInt(a[1]);
    return replay;
}
