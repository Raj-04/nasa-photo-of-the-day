import React from "react";
import styled from 'styled-components';

const MainPage = props => {

    const { title, description, imageURL, date } = props;


    return (
        <Container>
               <Header>NASA Photo of The Day</Header>
                <Date>{date}</Date>
               <Title> {title}</Title>
                <Description>{description}</Description>
                <img src={imageURL} alt="N/A" />
        </Container>
    );
}

const Container = styled.div`
background-color: #121312;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 15px; `

const Title = styled.h2`
color: #FF4500;
font-family: 'Space Mono', monospace;
`
const Header = styled.h1`
color: #6495ED;
font-family: 'Space Mono', monospace;
`
const Date = styled.p`
color: #E2E5E2;
`
const Description = styled.p`
color:#E2E5E2;
font-family: 'Space Mono', monospace;
`

export default MainPage; 