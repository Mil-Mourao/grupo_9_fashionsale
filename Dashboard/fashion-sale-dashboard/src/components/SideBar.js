import { React, Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider } from '@mui/material/';
import Home from './Home'
import Users from './Users'
import User from './User'

const drawerWidth = 240;

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        <Link to="/">Home</Link>
                        <Link to="/users">Usuarios</Link>
                        <Link to="/user/1">Usuario</Link>
                    </List>
                    <Divider />
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, padding: 0 }}
                >
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/users" axact component={Users} />
                        <Route path="/users/:id" axact component={User} />
                    </Switch>
                    <Toolbar />
                </Box>
            </Box>
        );
    }
}

export default SideBar;