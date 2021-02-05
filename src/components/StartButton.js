import React, { PureComponent } from 'react';
import styled from '@emotion/styled';

const StartButtonStyled = styled.button`
    background: #76c442;
    display: inline-block;
    position: relative;
    text-align: center;
    font-size: 20px;
    font-family: 'Press Start 2P', cursive;
    text-decoration: none; 
    color: white;
    margin-top: 2rem;
    padding:8px;

    &:hover,
    &:focus {
        background: #76c442;
        /* box-shadow: inset (-4px*1.5) (-4px*1.5) 0px 0px #4AA52E; */
        cursor: pointer;
    }

    &:active {
        box-shadow: inset 4px 4px 0px 0px #4AA52E;
    }

    &:before,
    &:after {
    content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: content-box;
    }

    &:before {
        top: -3px;
        left: 0;
        border-top: 3px whitesmoke solid;
        border-bottom: 3px whitesmoke solid;
    }

    &:after {
        left: -3px;
        top: 0;
        border-left: 3px whitesmoke solid;
        border-right: 3px whitesmoke solid;
    }

`;

const StartButton = ({callBack}) => {
    return ( 
        <StartButtonStyled onClick={callBack}>Play Game</StartButtonStyled>
     );
}
 
export default StartButton;