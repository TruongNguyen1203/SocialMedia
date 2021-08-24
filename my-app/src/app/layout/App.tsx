import './App.css';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import 'semantic-ui-css/semantic.min.css'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])



  return (
    <div>
      <NavBar></NavBar>
      <Container className="container-margin">
        <ActivityDashboard
        />
      </Container>

    </div>

  );
}

export default observer(App);
