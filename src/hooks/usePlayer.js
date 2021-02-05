import { useCallback, useState } from "react";
import Stage from "../components/Stage.js";
import {STAGE_WIDTH, rotateTetromino, checkColision} from './../helpers/helper.js';

import {TETROMINOS, randomTetromino} from './../tetrominos.js';

const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collision: false,
    })
    
    const updatePlayerPos = ({x, y, collision}) => {
        setPlayer(prevState => ({
            ...prevState,
            pos: { x : (prevState.pos.x + x), y : (prevState.pos.y + y)} ,
            collision,
        }));
    }
    

    const resetPlayer = useCallback(() => {
        setPlayer({
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: randomTetromino().shape,
          collision: false,
        })
      }, [])
    

    const rotatePlayer = (player, stage) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));       
        clonedPlayer.tetromino = rotateTetromino(clonedPlayer.tetromino, 'der');               
        if (!checkColision(clonedPlayer, stage, 0, 0 )) {
            setPlayer(clonedPlayer);
            return;            
        }        
        // Itearte between left and rigth
        let offset = 0;       
        let initialPos = clonedPlayer.pos.x;     
        for ( let i = 0, j = 0; i < clonedPlayer.tetromino[0].length; i += j ^= 1 ) {
            // Avoid check when offset is equal to 0.
            if (i != 0) {        
                offset = ( j == 0 ? i : -i );
                clonedPlayer.pos.x = initialPos + offset;
                if (!checkColision(clonedPlayer, stage, 0, 0 )) {                
                    setPlayer(clonedPlayer);
                    break;            
                }
            }              
        }        
        
    }      

    return [player, updatePlayerPos, resetPlayer, rotatePlayer];
}
 
export default usePlayer;

