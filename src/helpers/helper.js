export const STAGE_WIDTH = 12;
export const STAGE_HEIGTH = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGTH), () => (
            new Array(STAGE_WIDTH).fill([0, 'clear']) 
        )
    )

export const checkColision  = (player, stage,  moveX , moveY) => {     
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // Check if we are in tetromino cell
            if (player.tetromino[y][x] !== 0)                 
            {
                //2. Check if our move is inside the game. Dont collision to bottom
                if (!stage[y + player.pos.y + moveY] ||
                    // 3. Check collision to left and rigth stage
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                        //4. Check if cells not empty
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear")

                    return true;
            }
        }
    }
}

export const rotateTetrominoByIndex = (player) => {
    let rotated = Array.from(player.tetromino.keys(), () => new Array());
    let indexB;
    for (let x = 0; x < player.tetromino.length; x++) {
        for (let y = 0; y < player.tetromino[x].length; y++) {           
          indexB = player.tetromino[x].length - (x + 1);   
          rotated[y][indexB] = player.tetromino[x][y];           
        }
    }
    return rotated;
}

export const rotateTetromino = (tetromino, dir) => {
    let rotated = tetromino.map((element, index) => 
            tetromino.map((element2, index2) => {
            return element2[index];    
        })        
    );
    if (dir == 'der')
        return rotated.map(row => row.reverse());
    return rotated.reverse();
    
}

