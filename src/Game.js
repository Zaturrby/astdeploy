import R from 'ramda';

class Game {

  createBoard(gridSize){
    let boardSize = gridSize * gridSize;
    let boardMaker = R.mapIndexed(({value, checked}, id) => {
      return { id, value, checked }
    });
    let board = boardMaker(R.times(this.initializer, boardSize));
    let started = false;
    return { started, board };
  }

  toggleCell(index, board, ship){
    let gridSize = 16;
    let positionUpdate = 0; 
    let ship = {shipLength: 3, direction: "V"};
    let row = Math.ceil(index/gridSize);
    let shipIsPlacable = false;
    console.log(row)
    if ( ship.direction == "V" && row > gridSize - ship.shipLength) {
      alert("ship doesnt fit");
    } else if (ship.direction == "H" && index > gridSize * row - ship.shipLength) { 
      alert("Ship doesnt fit");
    } else {
      shipIsPlacable = true;
    }

    if (shipIsPlacable == true) {  
      for (var i=0; i<ship.shipLength; i++){
        if (ship.direction === "V"){ 
          positionUpdate = index + i*gridSize;
          console.log("index", index, "positionUpdate", positionUpdate, "i", i, " i*rowlength", i*gridSize);
        } else {
          positionUpdate = index + i;
        }
        let cell = board[positionUpdate].value === 'on' ? 'off' : 'on';
        board[positionUpdate].value = cell;
      }
    }

    
    return board;
  }

  checkCell(index, board){
    let message = board[index].value === 'on' ? 'hit' : 'miss';
    board[index].checked = true;
    let gameEnded = this.isOver(board);
    if(gameEnded){
      alert('its over: challenger won!');
    }

    return board;
  }

  isOver(board){
    let amount = 0;
    board.forEach((cell) => {
      if(!cell.checked && cell.value === 'on'){
        amount += 1;
      }
    });
    return !amount;
  };

  initializer(){
    return {
      value: 'off',
      checked: false
    }
  }
}

export default Game;
