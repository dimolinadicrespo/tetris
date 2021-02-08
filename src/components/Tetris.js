import React, {Fragment, useState}  from 'react';
import {createStage, checkColision, rotateTetrominoByIndex, rotateTetromino} from './../helpers/helper.js';
// Hooks
import usePlayer from './../hooks/usePlayer';
import useStage from './../hooks/useStage';
import {useGameStatus} from './../hooks/gameStatus';
import {useInterval} from './../hooks/useInterval';

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import styled from '@emotion/styled';
import bgImage from './../img/bg-dark.jpg';

const StyledTetrisWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 2rem;
    margin: 0 auto;
    max-width: 900px;

    aside{
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 1rem;
    }
`;

const FullGameWrapper = styled.div`  
    width: 100vw;
    height: 100vh;    
    background: url(${bgImage});
    background-color: blue;
    background-size: cover;
    color: white;
    overflow: hidden;
`;

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleaned] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleaned);

    //Function Game
    const movePlayer = (dir) => {
        if (!checkColision(player, stage, dir, 0)) {
            updatePlayerPos({x: dir , y: 0 })
        }        
    }

    const startGame = () => {        
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(1000);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        if (!checkColision(player, stage, 0, 1)) {
            updatePlayerPos({x:0 , y: 1, collision: false});
        } else {   
            if (player.pos.y == 0) {
                setGameOver(true);
                setDropTime(null);
            }         
            updatePlayerPos({x:0 , y: 0, collision: true});                                       
        }
        if (Math.ceil(score/1000) > (level + 1)){
            setLevel(prev => prev + 1);
            // console.log(Math.ceil(score/1000) + ' es mayor que ' + (level + 1))            
        }
        if (level < 10)
            setDropTime(Math.ceil(1000 - (level * (0.1) * 1000)));   
        else
            setDropTime(Math.ceil(100 - (level * (0.01) * 100)));   
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }
    
    const rotate = () => {        
        rotatePlayer(player, stage);
    }

    const move = ({ key }) => {          
        if (!gameOver) {            
            switch (key) {
                case 'ArrowRight':                    
                    movePlayer(1);
                    break;
                case 'ArrowLeft':
                    movePlayer(-1);
                    break;
                case 'ArrowUp':                    
                    rotate();
                    break;
                case 'ArrowDown':
                    dropPlayer(1);
                    break;            
                default:
                    break;
            }
        }
    }

    useInterval(() => {    
        drop();
     }, dropTime);

    return ( 
        <FullGameWrapper tabIndex="0" onKeyDown={e => move(e)}>            
            <StyledTetrisWrapper>
                <Stage stage={stage}></Stage>   
                <aside>
                    {
                        gameOver 
                        ?
                        (
                            <Display gameOver={gameOver} text="Game Over!"></Display>
                        )
                        :
                        (
                            <Fragment>
                                <Display text={`Score : ${score}`}></Display>
                                <Display text={`Rows : ${rows}`}></Display>
                                <Display text={`Level : ${level}`}></Display>
                            </Fragment>                            
                        )
                    }
                    
                    <StartButton callBack={startGame}></StartButton>
                </aside>
            </StyledTetrisWrapper>
        </FullGameWrapper>
     );
}
 
export default Tetris;