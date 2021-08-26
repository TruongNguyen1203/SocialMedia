import { Button, Image, Item, Segment } from 'semantic-ui-react'
import photo from '../../../app/assets/Images/categoryImages/drinks.jpg'
import { Activity } from '../../../app/models/activity'



const imageStyle = {
  filter: 'brightness(30%)'
}

const textStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
}

interface Props{
  activity : Activity
}
function ActivityHeader ({activity}: Props){
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{padding: '0'}}>
        <Image src={photo} fluid style={imageStyle} ></Image>
        <Segment style={textStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as='a' style={{color:'white'}}>{activity.title}</Item.Header>
                <Item.Meta style={{color:'white'}}>{activity.date}</Item.Meta>
                <Item.Description style={{color:'white'}}>
                  Hosted by <strong>Bob</strong>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached='bottom'> 
      <Button color='teal'>Join Activity</Button>
      <Button color='grey'>Cancel Attendance</Button>
      <Button color='orange' floated='right'>Manage Event</Button>
      </Segment>
    </Segment.Group>
  )
  
} 
export default ActivityHeader