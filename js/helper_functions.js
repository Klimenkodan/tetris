var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function determineFullRows() {
    let destroy_arr = [];
    let destroy = -1;
    for (let i = playground.length - 1; i >= 0; i--) {
        for (let k = 0; k < playground[0].length; k++) {
            destroy = i;
            if (playground[i][k] === undefined) {
                destroy = -1;
                break;
            }
        }
        if (destroy !== -1) {
            destroy_arr.push(destroy);
        }
    }
    return destroy_arr;
}