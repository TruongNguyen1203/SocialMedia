import React, { ChangeEvent, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity : Activity) => void;
}
function ActivityForm({selectedActivity, closeForm, createOrEdit} : Props){

  const initialState = selectedActivity ? selectedActivity : {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const value = event.target.value;
    setActivity({
      ...activity,
      [event.target.name] : value
    }); 
  }

  function handelSubmitForm(){
    createOrEdit(activity)
  }
  return (
    <Form onSubmit={handelSubmitForm} autoComplete='off'>
    <Form.Input name='title' placeholder='Title' value={activity.title} onChange={handleChange} />
    <Form.TextArea name='description' placeholder='Description' value={activity.description} onChange={handleChange} />
    <Form.Input name='category' placeholder='Category' value={activity.category} onChange={handleChange}  />
    <Form.Input name='date' placeholder='Date' value={activity.date} onChange={handleChange}  />
    <Form.Input name='city' placeholder='City' value={activity.city} onChange={handleChange}  />
    <Form.Input name='venue' placeholder='Venue' value={activity.venue} onChange={handleChange} />
    
    <Button floated='right' onClick={() => closeForm()} color = 'grey'>Cancel</Button>
    <Button floated='right' type='submit' color = 'green'>Submit</Button>
  </Form>

  )
}

export default ActivityForm