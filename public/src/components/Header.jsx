import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withRouter } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drawer:false
        }
    }
    openDrawer = () =>{this.setState({drawer:true})}
    closeDrawer = () =>{this.setState({drawer:false})}
    links = [
        {
            name:"Home",
            route:"/"
        },
        {
            name:"RunCode",
            route:'/runcode'
        },
        {
            name:"OpenCV",
            route:"/opencv"
        }
    ]
    renderLinks = () =>{
        return this.links.map((l)=>{
            return(
                <ListItem button key={l.name} onClick={()=>this.pushPull(l.route)}>
                    <ListItemText primary={l.name} />
                </ListItem>
            )
        })
    }
    pushPull = (r) =>{
        this.props.history.push(r);
        this.setState({drawer:false});
    }
    render(){
        return(
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.openDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            Python Showcase
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
                    <List>
                        {this.renderLinks()}
                    </List>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(Header);