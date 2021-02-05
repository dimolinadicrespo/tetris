import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import {TETROMINOS} from './../tetrominos';

const StyledCell = styled.div`
    width: auto;
    background-color: rgba(${props => props.color}, 0.5);
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 0.3);
`;

const Cell = ({type}) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color}>         
        </StyledCell>
    );
}
 
export default React.memo(Cell);
