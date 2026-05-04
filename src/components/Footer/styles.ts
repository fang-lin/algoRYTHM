import styled from 'styled-components';
import {Theme} from '../Theme';

export const FooterWrapper = styled.footer<Theme>`
    padding: 20px 0;
    font-size: 12px;
    line-height: 20px;
    color: ${({numberColor}) => numberColor};
    a {
        color: ${({numberColor}) => numberColor};
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;
