import React, { PureComponent } from 'react'
import styled from '@emotion/styled';

const StyledBorderRound = styled.div`

    background: ${$props => $props.color};
    display: block;
    position: relative;
    text-align: left;
    font-size: 15px;
    font-family: 'Press Start 2P', cursive;
    text-decoration: none; 
    padding:10px;
    color: white;  
    margin-bottom: 0.8rem;
   
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

const Display = ({text}) => {
    return ( 
        <StyledBorderRound>
            {text}
        </StyledBorderRound>
     );
}
 
export default Display;