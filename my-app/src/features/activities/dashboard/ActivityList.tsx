import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id : string) => void;
    deleteActivity: (id : string) => void;
}

const ActivityList = ({ activities, selectActivity, deleteActivity }: Props) => (
    <Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>
                            <span className='cinema'>{activity.date}</span>
                        </Item.Meta>
                        <Item.Description>{activity.description}</Item.Description>
                        <Item.Description>{activity.city}, {activity.venue}</Item.Description>
                        <Item.Extra>
                            <Label>{activity.category}</Label>
                           
                            <Button floated='right' color='blue' onClick={()=>selectActivity(activity.id)}>
                                View

                            </Button>
                            <Button floated='right' color='red' onClick={()=>deleteActivity(activity.id)}>
                                Delete

                            </Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}


        </Item.Group>
    </Segment>

)

export default ActivityList