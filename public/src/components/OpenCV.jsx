import React from 'react';
import Button from '@material-ui/core/Button';

class OpenCV extends React.Component{
    state = {
        image: ""
    }
    onSubmit = () =>{
        var fileObject = document.getElementById("files");
        var form_data = new FormData($('#upload-file')[0]);
        var self = this;
        $.ajax({
            type: 'POST',
            url: '/findface',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                self.setState({image:data})
            },
            error: (a,b,c)=>{
                console.log(a,b,c);
            }
        });
    }
    render(){
        return(
            <div style={{textAlign:'center'}}>
                <p>
                        Upload Image File
                </p>
                <form id="upload-file" method="post" encType="multipart/form-data">
                    <input type="file"
                    id="files" name="Files"/>
                </form>
                <br/>
                <Button variant="outlined" onClick={this.onSubmit}>
                    Submit
                </Button>
                <br/>
                <br/>
                {this.state.image?<img width={"100%"} src={`data:image/png;base64,${this.state.image}`} />:<div/>}
            </div>
        )
    }
}

export default OpenCV;