import React, { Component } from 'react';
import IsImageURL from 'is-image-url';
import { Modal, Button, Form, Dimmer, Loader } from 'semantic-ui-react';

//Import the axios instance from axios-meme file
import axios from '../../axios-xmeme';
import './index.css'

//Button to Send a new meme to database
class AddMeme extends Component {
  state = {
    open: false, //Check if the modal to enter meme details is open or not
    formData: {
      name: '',
      url: '',
      caption: ''
    },
    //Check if there is some error in the form fields
    error: {
      name: null,
      url: null,
      caption: null
    },
    editing: false, //Check if user has started editing the form
    loading: false //Check if meme is being sent to the backend
  }

  setOpen(value) {
    this.setState({ open: value }); //Change the current state of form modal
  }

  inputChangeHandler(event, fieldName) {
    const formData = { ...this.state.formData };
    formData[fieldName] = event.target.value
    this.setState({ formData, editing: true }); //If user starts editing a field set the editing to true

    //validation for name filed
    if (fieldName === 'name') {
      const error = { ...this.state.error };
      if (event.target.value === '') {
        error.name = {
          content: 'Name length should be atleast 1',
          pointing: 'below',
        }
      } else {
        error.name = null;
      }

      this.setState({ error })
    }

    //Validation for captions
    if (fieldName === 'caption') {
      const error = { ...this.state.error };
      if (event.target.value === '') {
        error.caption = {
          content: 'Caption length should be atleast 1',
          pointing: 'below',
        }
      } else {
        error.caption = null;
      }
      this.setState({ error })
    }

    //validation for image URL
    if (fieldName === 'url') {
      const error = { ...this.state.error };
      if (!IsImageURL(event.target.value)) {
        error.url = {
          content: 'Type a correct image URL',
          pointing: 'below',
        }
      } else {
        error.url = null;
      }
      this.setState({ error })
    }

  }

  onSubmitHandler() {
    const meme = { ...this.state.formData };
    //Send post request to /memes endpoint of the server
    //Once response is received hide loader
    //Show the meme status to user in the toaster recieved via props
    axios.post('/memes', meme)
      .then(response => {
        this.setState({ loading: false })
        //If meme is successfully added show the meme to the user
        this.props.addMeme({...meme, id: response.data.id});
        this.props.showToast(response.status);
      }).catch(error => {
        this.setState({ loading: false })
        this.props.showToast(error.response.status);
      })
    //Once request is sent. Close the form modal and open the loading spinner.
    this.setState({ open: false, loading: true });
  }

  render() {
    //If request is being sent show loader else hide it
    let loader = null;
    if (this.state.loading) {
      loader = (
        <Dimmer active>
          <Loader size='huge'>loading</Loader>
        </Dimmer>
      )
    }
    return (
      <>
        {loader}
        <div className='addMeme-button' style={{ zIndex: '99' }}>
          <Modal
            centered={false}
            open={this.state.open}
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
            trigger={<Button content='Add meme' icon='add' labelPosition='left' color='red' />}
          >
            <Modal.Header>Add a new meme</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.Input
                    required
                    label='Name'
                    placeholder='Type your name'
                    onChange={event => (this.inputChangeHandler(event, 'name'))}
                    error={this.state.error.name}
                  />
                  <Form.Input
                    required
                    label='Caption'
                    placeholder='Type a caption for the meme'
                    onChange={event => (this.inputChangeHandler(event, 'caption'))}
                    error={this.state.error.caption}
                  />
                  <Form.Input
                    required label='URL'
                    placeholder='Type a URL for the meme'
                    onChange={event => (this.inputChangeHandler(event, 'url'))}
                    error={this.state.error.url}
                  />
                  <Button
                    positive
                    onClick={() => (this.onSubmitHandler())}
                    //Activate the send button only when the fields are valid
                    disabled={this.state.error.caption || this.state.error.name || this.state.error.url || !this.state.editing}
                  >
                    Create meme
                </Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => this.setOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </div>
      </>
    );
  }


};

export default AddMeme;