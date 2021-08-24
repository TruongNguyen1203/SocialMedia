import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetail from './ActivityDetail';
import ActivityForm from './ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


function ActivityDashboard() {
  const { activityStore } = useStore();
  const { editMode, selectedActivity} = activityStore;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList

          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity &&
            <ActivityDetail
          
            />}
          {editMode &&
            <ActivityForm
            />

          }


        </Grid.Column>
      </Grid.Row>
    </Grid>

  )

}




export default observer(ActivityDashboard);