import { Header, Menu } from 'semantic-ui-react'


function ActivityFilter() {
    return (
        <>
        <Menu vertical style={{width: '100%', marginTop:25}}>
            <Header icon='filter' attached color='teal' content='Filters' ></Header>
            <Menu.Item>All Activities</Menu.Item>
            <Menu.Item>I'm going</Menu.Item>
            <Menu.Item>I'm hosting</Menu.Item>
        </Menu>
        </>
    )
}

export default ActivityFilter