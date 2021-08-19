import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import 'semantic-ui-css/semantic.min.css'
import { Activity } from '../models/activity';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(function (response) {
        console.log(response);
        setActivities(response.data);
      })
  }, [])

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

 function handleOpenForm(id? : string){
   id ? setSelectedActivity(activities.find(x => x.id ===id)) : setSelectedActivity(undefined);
   setEditMode(true);
 }

 function handleCloseForm(){
   setEditMode(false);
 }

 function handleCreateOrEditForm(activity : Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
                : setActivities([...activities, {...activity, id: uuidv4() }]);

    setEditMode(false);
    setSelectedActivity(activity);

 }

 function handleDeleteActivity(id : string)
 {
   setActivities([...activities.filter(x => x.id !== id)]);
 }


  return (
    <div>
      <NavBar openForm = {handleOpenForm}></NavBar>
      <Container className="container-margin">
        <ActivityDashboard 
        activities = {activities}
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        closeForm = {handleCloseForm}
        openForm = {handleOpenForm}
        createOrEdit = {handleCreateOrEditForm}
        deleteActivity = {handleDeleteActivity}
         />
      </Container>

    </div>

  );
}

export default App;
