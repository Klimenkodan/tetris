function moveLeft(obj) {
    console.log('moving left');
    move(canMoveLeft, position => (position[1] > 0 && (position[1] -= 1)));

}

function moveRight() {
    console.log('moving right');
    move(canMoveRight, position => (position[1] < playground[0].length - 1 && (position[1] += 1)));
}

function moveDown() {
    console.log('moving down');
    move(canMoveDown, position => (position[0] > 0 && (position[0] -= 1)));

}

function move(func_can, func_move) {

    let currentObject = getCurrentObject();

    if (func_can()) {
        currentObject.position.forEach(func_move);
    }

    playground = createPlayground();


    renderPlayground();


}

function canMove(func) {
    let curObj = getCurrentObject();
    let new_positions = curObj.position.map(func);

    for (let k = 0; k < new_positions.length; k++) {
        if (playground.length - 1 < new_positions[k][0] || new_positions[k][0] < 0 || new_positions[k][1] < 0 || new_positions[k][1] > playground[0].length - 1) {
            return false;
        }
    }

    for (let i = 0; i < new_positions.length; i++) {
        let same_cell = false;

        for (let j = 0; j < curObj.position.length; j++) {
            if (new_positions[i][0] === curObj.position[j][0] && new_positions[i][1] === curObj.position[j][1]) {
                same_cell = true;
            }
        }
        if (playground[new_positions[i][0]][new_positions[i][1]] !== undefined && !same_cell) {
            return false;
        }
    }
    return true;
}

function canRotate(new_positions) {
    let curObj = getCurrentObject();

    for (let k = 0; k < new_positions.length; k++) {
        if (playground.length - 1 < new_positions[k][0] || new_positions[k][0] < 0 || new_positions[k][1] < 0 || new_positions[k][1] > playground[0].length - 1) {
            return false;
        }
    }

    for (let i = 0; i < new_positions.length; i++) {
        let same_cell = false;

        for (let j = 0; j < curObj.position.length; j++) {
            if (new_positions[i][0] === curObj.position[j][0] && new_positions[i][1] === curObj.position[j][1]) {
                same_cell = true;
            }
        }
        if (playground[new_positions[i][0]][new_positions[i][1]] !== undefined && !same_cell) {
            return false;
        }
    }
    return true;
}


function canMoveDown() {
    return canMove(element => [element[0] - 1, element[1]]);
}

function canMoveRight() {
    return canMove(element => [element[0], element[1] + 1]);
}

function canMoveLeft() {
    return canMove(element => [element[0], element[1] - 1]);
}