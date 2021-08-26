import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import ActivityHeader from './ActivityHeader';
import ActivityInfo from './ActivityInfo';
import ActivityComment from './ActivityComment';
import ActivityAttendance from './ActivityAttendance';


function ActivityDetail() {
  const {activityStore} = useStore();
  const {selectedActivity, loadActivity} = activityStore;
  const { id } = useParams<{id : string}>();

  useEffect(() => {
    if (id) loadActivity(id)
  },[id, loadActivity]);

  if(selectedActivity === undefined) return null;
  return (
    <Grid>
    <Grid.Row>
      <Grid.Column width={10}>
        <ActivityHeader activity ={selectedActivity}/>
        <ActivityInfo activity ={selectedActivity} />
        <ActivityComment/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityAttendance activity ={selectedActivity}/>
      </Grid.Column>
     
    </Grid.Row>
  </Grid>
  )
}


export default observer(ActivityDetail)