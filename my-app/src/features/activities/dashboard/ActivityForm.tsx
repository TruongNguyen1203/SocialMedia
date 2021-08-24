import { ChangeEvent, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


function ActivityForm(){
  const {activityStore} = useStore();
  const {selectedActivity, closeForm, updateActivity, createActivity} = activityStore;

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
    activity.id ? updateActivity(activity) : createActivity(activity);
  }
  return (
    <Form onSubmit={handelSubmitForm} autoComplete='off'>
    <Form.Input name='title' placeholder='Title' value={activity.title} onChange={handleChange} />
    <Form.TextArea name='description' placeholder='Description' value={activity.description} onChange={handleChange} />
    <Form.Input name='category' placeholder='Category' value={activity.category} onChange={handleChange}  />
    <Form.Input type='date' name='date' placeholder='Date' value={activity.date} onChange={handleChange}  />
    <Form.Input name='city' placeholder='City' value={activity.city} onChange={handleChange}  />
    <Form.Input name='venue' placeholder='Venue' value={activity.venue} onChange={handleChange} />
    
    <Button floated='right' onClick={() => closeForm()} color = 'grey'>Cancel</Button>
    <Button floated='right' type='submit' color = 'green'>Submit</Button>
  </Form>

  )
}

export default ActivityForm