import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/monokai';

import axios from 'axios';
import Button from '@material-ui/core/Button';

class RunCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code: "",
            view: "editor",
            console: ""
        }
    }
    onSubmit = async () =>{
        var res = await axios.post('/runservercode', { code:this.state.code })
        console.log(res)
        this.setState({
            view: "console",
            console: res.data
        });
    }
    onChange = (x,y) =>{
        var x = x
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201C\u201D]/g, '"');
        this.setState({code:x});
    }
    flipView = () =>{
        if(this.state.view === "editor"){
            this.setState({view:'console'});
        }
        else{
            this.setState({view:'editor'});
        }
    }
    renderConsoleLines = (lines) =>{
        var splines = lines.split(/\n/);
        console.log
        return splines.map((s)=>{
            return(
                <p>
                    {s}
                </p>
            )
        })
    }
    renderView = () =>{
        if(this.state.view === "editor"){
            return(
                <AceEditor
                    mode="python"
                    theme="monokai"
                    onChange={this.onChange}
                    name="code_editor"
                    value={this.state.code}
                    editorProps={{$blockScrolling: true}}
                    style={{width:"100%",height:window.innerHeight*.8}}
                    fontSize={16}
                />
            )
        }
        else{
            return(
                <div style={{width:'100%',height:window.innerHeight*.8,backgroundColor:'black',color:'white'}}>
                    <p>>Python Console</p>
                    {this.renderConsoleLines(this.state.console)}
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                {this.renderView()}
                <div style={{position:'absolute',bottom:0,left:0,right:0,width:'100%',height:40,backgroundColor:"#EEEEEE",textAlign:'center'}}>
                <Button variant="outlined" onClick={this.onSubmit}>
                    Submit
                </Button>
                <div style={{width:20,display:'inline-block'}}></div>
                <Button variant="outlined" onClick={this.flipView}>
                    {this.state.view==="editor"?"console":"editor"}
                </Button>
                </div>
            </div>
        )
    }
}

export default RunCode;