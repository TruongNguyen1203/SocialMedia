import { Button, Comment, Form, Segment } from 'semantic-ui-react'
import user from '../../../app/assets/Images/user.png'

const ActivityComment = () => (
    <Segment.Group>
        <Segment textAlign='center' color='teal' as='h3' inverted>
            Chat about this event
        </Segment>
        <Segment>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src={user} />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src={user} />
                    <Comment.Content>
                        <Comment.Author as='a'>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        </Segment>
    </Segment.Group>

)

export default ActivityComment