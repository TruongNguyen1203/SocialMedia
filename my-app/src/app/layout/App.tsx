import './App.css';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import 'semantic-ui-css/semantic.min.css'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDetail from '../../features/activities/details/ActivityDetail';
import ActivityForm from '../../features/activities/dashboard/ActivityForm';


function App() {
  const { activityStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])



  return (
    <div>
      <Route exact path='/' component={HomePage}></Route>

      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar></NavBar>
          <Container className="container-margin">
          <Route exact path='/activities' component={ActivityDashboard}></Route>
          <Route path='/activities/:id' component={ActivityDetail}></Route>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}></Route>
          </Container>
        </>
      )}>

      </Route>


    </div>

  );
}

export default observer(App);
