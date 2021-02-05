import React from 'react'
import Cell from './Cell';
import styled from '@emotion/styled';

const StyledStage = styled.div`
    display: grid;    
    grid-template-rows: repeat(${props => props.heigth}, calc(30vw/${props => props.heigth}));
    grid-template-columns: repeat(${props => props.width}, 1fr);    
    grid-gap: 2px;
    width: 100%;
    border: 2px solid #333;
    max-width: 25vw;
    background: #111;

`;

const Stage = ({stage}) => {
    return ( 
        <StyledStage width={stage[0].length} heigth={stage.length}>
            {
                stage.map(row => row.map((col,index) => (<Cell key={index} type={col[0]}></Cell>)))
            }            
        </StyledStage>
     );
}
 
export default Stage;