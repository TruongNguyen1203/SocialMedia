import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import 'semantic-ui-css/semantic.min.css'
import { Activity } from '../models/activity';
import { v4 as uuidv4 } from 'uuid';
import { forEachChild } from 'typescript';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  axios.defaults.baseURL = 'http://localhost:5000';

  useEffect(() => {
    axios.get('/api/activities')
      .then(function (response) {
        let activities : Activity[] = [];
        response.data.forEach((activity: Activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(response.data);
      })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? setSelectedActivity(activities.find(x => x.id === id)) : setSelectedActivity(undefined);
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleCreateOrEditForm(activity: Activity) {
    if (activity.id) {
      axios.put(`/api/activities/${activity.id}`, activity).then(function (response) {
        console.log(response);
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);

      })
    }
    else {
      activity.id = uuidv4();
      axios.post(`/api/activities`, activity).then(function (response) {
        console.log(response);
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);

      })
    }
  }

  function handleDeleteActivity(id: string) {
    axios.delete(`/api/activities/${id}`).then(function (response) {
      console.log(response);
      setActivities([...activities.filter(x => x.id !== id)]);
    })
    
  }


  return (
    <div>
      <NavBar openForm={handleOpenForm}></NavBar>
      <Container className="container-margin">
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          closeForm={handleCloseForm}
          openForm={handleOpenForm}
          createOrEdit={handleCreateOrEditForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>

    </div>

  );
}

export default App;
