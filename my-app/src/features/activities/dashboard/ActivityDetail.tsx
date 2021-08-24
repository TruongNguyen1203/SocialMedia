import { Card, Image, Button } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';


function ActivityDetail() {
  const {activityStore} = useStore();
  const {selectedActivity, openForm, setCancelSelectedActivity} = activityStore;

  if(selectedActivity === undefined) return null;
  const photo = require(`../../../app/layout/assets/categoryImages/${selectedActivity.category}.jpg`).default;
  return (
    <Card fluid>
      <Image src={photo} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>
          {selectedActivity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button onClick={() => openForm(selectedActivity.id)} basic color='blue'>
            Edit
          </Button>
          <Button onClick={() => setCancelSelectedActivity()} basic color='grey'>
            Cancel
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}


export default ActivityDetail