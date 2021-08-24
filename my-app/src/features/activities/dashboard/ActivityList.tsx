import { observer } from 'mobx-react-lite';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


function ActivityList () {
    const {activityStore} = useStore();
    const {activitiesByDate, setSelectedActivity, deleteActivity} = activityStore;
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
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

                                <Button floated='right' color='blue' onClick={() => setSelectedActivity(activity.id)}>
                                    View

                                </Button>
                                <Button floated='right' color='red' onClick={() => deleteActivity(activity.id)}>
                                    Delete

                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}


            </Item.Group>
        </Segment>

    )
}

export default observer(ActivityList)