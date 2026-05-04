import styled from 'styled-components';
import {Theme} from '../Theme';
import {device} from '../Algorithms/styles';

export const List = styled.ul<Theme>`
    list-style: none;
    padding: 0;
    margin: -3px;
    width: unset;
    @media ${device.laptop} {
        width: 180px;
    }
`;
export const ListItem = styled.li<Theme>`
    display: inline-block;
    margin: 3px;
    font-size: 12px;
    a {
        text-decoration: none;
        color: ${({codeColor}) => codeColor};
        :hover {
            text-decoration: underline;
        }
        &.active {
            color: ${({operatorColor}) => operatorColor};
            text-decoration: underline;
        }
    }
`;
