import {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Source Code Pro', monospace;
    background: #222;
  }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Code = styled.h1`
    font-size: 120px;
    margin: 0;
    color: #666;
`;

const Message = styled.p`
    font-size: 18px;
    color: #888;
    margin: 0 0 30px;
`;

const HomeLink = styled(Link)`
    font-size: 14px;
    color: #aaa;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid #666;
    transition: all 0.2s;

    &:hover {
        background: #aaa;
        color: #222;
    }
`;

const NotFound: FunctionComponent = () => {
    return <>
        <GlobalStyle/>
        <Wrapper>
            <Code>404</Code>
            <Message>Page not found</Message>
            <HomeLink to="/">Back to Home</HomeLink>
        </Wrapper>
    </>;
};

export default NotFound;
