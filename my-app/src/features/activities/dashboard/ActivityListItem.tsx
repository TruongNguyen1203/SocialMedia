import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import user from '../../../app/assets/Images/user.png'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity : Activity;
}
function ActivityListItem({activity} : Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image circular size='tiny' src={user} />

                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>Hosted by Bob</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                <Icon name='clock'></Icon>{activity.date}
                <Icon name='map marker'></Icon>{activity.venue}, {activity.city}
                </span>
            </Segment>
            <Segment secondary>Atendees go here</Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right'>View</Button>
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem