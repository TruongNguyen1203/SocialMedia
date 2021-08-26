import { Link } from 'react-router-dom'
import { Item, Label, Segment } from 'semantic-ui-react'
import user from '../../../app/assets/Images/user.png'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity : Activity
  }
function ActivityAttendance ({activity} :Props) {
    return (
        <Segment.Group>
            <Segment textAlign='center' color='teal' as='h3' inverted>
                3 People Going
            </Segment>
            <Segment attached>
                <Item.Group>
                    <Label as='a' color='orange' ribbon='right' >
                        Host
                    </Label>
                    <Item>
                        <Item.Image size='tiny' src={user} />
                        <Item.Content>
                            <Item.Header as='a'>
                            <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Meta style={{color: 'orange'}}>Following</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
    
            </Segment>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={user} />
                        <Item.Content>
                            <Item.Header as='a' >
                             <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Meta style={{color: 'orange'}}>Following</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
    
            </Segment>
        </Segment.Group>
    
    )
} 

export default ActivityAttendance