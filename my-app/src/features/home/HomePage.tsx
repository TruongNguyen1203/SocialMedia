import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'
import logo from '../../app/assets/Images/logo.png'

export default function HomePage(){
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src={logo} alt='logo' style={{marginBottom: 12}}></Image>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to the Activities!
                </Button>
            </Container>
        </Segment>
    )
}