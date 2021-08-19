import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetail from './ActivityDetail';
import ActivityForm from './ActivityForm';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  closeForm: () => void;
  openForm: (id: string) => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;

}
const ActivityDashboard = ({ activities, selectActivity, selectedActivity, editMode, cancelSelectActivity,closeForm, openForm, createOrEdit, deleteActivity }: Props) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity &&
          <ActivityDetail
            selectedActivity={selectedActivity}
            cancelSelectActivity = {cancelSelectActivity}
            openForm ={openForm}
          />}
        {editMode &&
          <ActivityForm
             selectedActivity = {selectedActivity}
             closeForm = {closeForm}
             createOrEdit = {createOrEdit}
          />

        }


      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default ActivityDashboard