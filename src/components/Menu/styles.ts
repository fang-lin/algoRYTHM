import styled from 'styled-components';
import {Theme} from '../Theme';
import {device} from '../Algorithms/styles';

export const List = styled.ul<Theme>`
    color: ${({codeColor}) => codeColor};
    list-style: none;
    padding: 0;
    font-weight: bold;
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media ${device.laptop} {
      display: block;
      margin: -20px 0 0 0;
      text-align: right;
    }
`;
export const ListItem = styled.li<Theme>`
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    a {
      padding: 10px;
      display: block;
      text-decoration: none;
      color: ${({keywordColor}) => keywordColor};
      @media ${device.laptop} {
        padding: 20px 30px;
        display: inline-block;
      }
      &:hover {
        text-decoration: underline;
      }
      &.active {
        text-decoration: none;
        background: ${({defColor}) => defColor};
      }
    }
`;
