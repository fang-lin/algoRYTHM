import styled from 'styled-components';
import {Theme} from '../Theme';

export const OperationBarWrapper = styled.div`
    padding: 10px 25px;
`;

export const Raw = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px -10px;
    padding: 0;
`;

export const Item = styled.div<Theme>`
    a,
    button {
        margin: 0 5px;
        cursor: pointer;
        display: block;
        border-radius: 29px;
        border: solid 3px transparent;
        padding: 10px;
        background: none;
        font: inherit;

        svg {
            display: block;
            width: 32px;
            height: 32px;
            fill: ${({keywordColor}) => keywordColor};
        }

        &.active {
            background: ${({defColor}) => defColor};
        }

        &:hover {
            border-color: ${({keywordColor}) => keywordColor};
        }

        &:active {
            border-color: ${({defColor}) => defColor};
        }
    }
`;
