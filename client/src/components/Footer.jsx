import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
`

const Footer = () => {

    return (
        <StyledFooter id="footer">
            <p>footer</p>
        </StyledFooter>
    );
}

export default Footer;
