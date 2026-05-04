import styled from 'styled-components';
import {Theme} from '../Theme';
import {rgba} from '../../functions';

export const AudioAlertBackground = styled.div<Theme>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
   background: ${({backgroundColor}) => rgba(backgroundColor, .75)};
`;

export const AudioAlterButton = styled.h2<Theme>`
  padding: 20px;
  line-height: 20px;
  background: ${({defColor}) => defColor};
  color: ${({keywordColor}) => keywordColor};
  display: flex;
  cursor: pointer;
  gap: 16px;
  align-items: center;
  border: solid 5px transparent;
  user-select: none;
  font-size: 64px;
  font-weight: bold;
  margin: 0;
  transition: background 1s;

  &:active {
    border-color: ${({keywordColor}) => keywordColor};
  }

  svg {
    display: block;
    width: 64px;
    height: 64px;
    fill: ${({keywordColor}) => keywordColor};
  }
`;

export const CoinTossButton = styled.h3<Theme>`
  margin: 0;
  a {
    background: ${({defColor}) => defColor};
    color: ${({keywordColor}) => keywordColor};
    text-decoration: none;
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    gap: 4px;
    cursor: pointer;
    align-items: center;
    border: solid 5px transparent;
    user-select: none;
    padding: 4px 10px 4px 4px;
    transition: background 1s;
    
    &:active {
      border-color: ${({keywordColor}) => keywordColor};
    }

    svg {
      display: block;
      width: 32px;
      height: 32px;
      fill: ${({keywordColor}) => keywordColor};
    }
  }
`;

export const Head3 = styled.h3<Theme>`
  margin: 0;
  position: fixed;
  bottom: 0;
  font-size: 32px;
  font-weight: bold;
  color: ${({variableColor}) => variableColor};
  opacity: .3;
`;
