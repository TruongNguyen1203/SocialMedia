import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityFilter from './ActivityFilter';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function ActivityDashboard() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList

          />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityFilter/>
          <Calendar className='filter-calendar'/>
        </Grid.Column>
       
      </Grid.Row>
    </Grid>

  )

}




export default observer(ActivityDashboard);