import React from 'react';
import { Segment, Container, List, Header, Icon } from 'semantic-ui-react'

//Meme page footer
const footer = () => {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>

        {/* <Image centered size='mini' src='https://react.semantic-ui.com/logo.png' /> */}
        <Header as='h4' inverted>
          Created with <Icon name='like' color='red' />
        </Header>
        <Header as='h5' inverted>
          <List horizontal divided inverted link size='small'>
          <List.Item>
            -By Sachi Gupta
          </List.Item>
          <List.Item>
            All rights reserved 
          </List.Item>
          <Icon name='copyright outline'/>
        </List>
        </Header>
        <List horizontal inverted link size='small'>
          <List.Item as='a' href='https://www.linkedin.com/in/sachi-gupta-ba7b9b190/'>
            <Icon name='linkedin' size='big' />
          </List.Item>
          <List.Item as='a' href='https://github.com/sachigupta22'>
            <Icon name='github' size='big' />
          </List.Item>
          <List.Item as='a'>
            <Icon name='instagram' size='big' />
          </List.Item>
          <List.Item as='a'>
            <Icon name='facebook official' size='big' />
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
}

export default footer;