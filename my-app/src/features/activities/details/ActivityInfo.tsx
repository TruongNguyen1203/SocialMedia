import React from 'react'
import { Grid, Icon, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity
}
function ActivityInfo({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='info' color='teal'></Icon>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <span>{activity.description}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='calendar' color='teal'></Icon>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <span>{activity.date}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='marker' color='teal'></Icon>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <span>{activity.venue}, {activity.city}</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default ActivityInfo