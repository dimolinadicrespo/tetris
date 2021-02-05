import { useState, useEffect } from "react";
import {createStage} from './../helpers/helper.js';


const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());    
    const [rowsCleaned, setRowsCleaned] = useState(0);    
    useEffect(() => {
        setRowsCleaned(0);
        const isRowCompleted = (cell) => cell[0] === 0;
        const cleaningRows = newStage => 
            newStage.reduce((acc, row) => {
                if (row.findIndex(isRowCompleted) === -1) {  
                    acc.unshift(new Array(row.length).fill([0, "clear"]));                      
                    setRowsCleaned(prev => prev + 1);
                    return acc;                  
                } 
                acc.push(row);                    
                return acc;             
            }, [])    
        

        const updateStage = prevStage => {            
            const nextStage = prevStage.map( row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))                    
            ); 

            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        nextStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collision ? 'merged' : 'clear'}`
                        ]
                    }
                })
            })
            
            if (player.collision) {
                resetPlayer();
                return cleaningRows(nextStage);
            }
            
            return nextStage;
        }

        // Here are the updates
        setStage(prev => updateStage(prev));

    }, [ player.collision, player.pos.x, player.pos.y, player.tetromino, resetPlayer])
    
    return [stage, setStage, rowsCleaned];
}
 
export default useStage;