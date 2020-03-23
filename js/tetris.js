
var playground = createPlayground();


// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    });
  });
}


function destroyRow() {

  let destroy_arr = determineFullRows();

  for (let i = 0; i < destroy_arr.length; i++) {
    let new_positions = [];
    for (let k = 0; k < objects.length; k++) {
      new_positions = objects[k].position.filter(element => element[0] !== destroy_arr[i]);
      for (let p = 0; p < new_positions.length; p++) {
        if (destroy_arr[i] < new_positions[p][0]) {

          new_positions[p][0] -= 1;
        }
      }

      objects[k].position = JSON.parse(JSON.stringify(new_positions));
    }

  }

  playground = createPlayground();
  renderPlayground();

}

function pauseGame() {
  console.log('pausing the game');
  clearInterval(gameInterval);
}

function rotate() {
  let curObj = getCurrentObject();
  const init_pos = INITIAL_POSITIONS[curObj.type];
  console.log(init_pos);
  let new_positions = init_pos[(init_pos.indexOf(curObj.position) + 1) % init_pos.length];
  if (canRotate(new_positions)) {
    curObj.position = JSON.parse(JSON.stringify(new_positions));

    playground = createPlayground();

    renderPlayground();
  }

}

renderPlayground();

// interval 1 second
let ind = 0;
let last_ind = 0;

var gameInterval = setInterval(() => {



  if (canMoveDown()) {
    moveDown();
    ind += 1;
  }

  else {

    getCurrentObject().state = 'static';
    destroyRow();

    if (last_ind === ind) {
      pauseGame();
      alert("GAME OVER");
    }

    else {
      let figure = ["L", "I", "T"][getRandomInt(0, 3)];
      let initial_pos = INITIAL_POSITIONS[figure][getRandomInt(0, INITIAL_POSITIONS[figure].length)];

      let object = {
        type: figure,
        state: 'falling',
        position: JSON.parse(JSON.stringify(initial_pos))

      };
      last_ind = ind;

      objects.push(object);

      playground = createPlayground();
      renderPlayground();
    }
  }
}, 1000);
