import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';
import { TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {assignment:'', duedate:'',courseid:''};
    };



 // handleClose 

//  handleChange
 
  addAssignment = () => {
    console.log("AddAssignment.addAssigment");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/assignment`, 
      {  
        method: 'Post', 
        headers: { 'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json'},
        body: JSON.stringify({assignmentName: this.state.assignment, dueDate: this.state.duedate, courseId: this.state.courseid})
      } )
      
      .then(res => {
        if (res.ok) {
          toast.success("Assignment successfully added", {
          position: toast.POSITION.BOTTOM_LEFT
          });
         
        } else {
          toast.error("Assignment adding failed", {
          position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Put http status =' + res.status);
    }})
      .catch(err => {
        toast.error("Fetch failed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
           
      })
      
     
  }



  

  handleChange = (event) =>  {
    this.setState({[event.target.name]: event.target.value});
 }
  
  render() {
      
    const { assignment, duedate,courseid} = this.state;

      return (
          <div align="left" >          
            <h3>
              <TextField autoFocus style = {{width:200}}
                label = "Add an assignment" name ="assignment"
                onChange={this.handleChange}  value={assignment}
              />
              </h3>
              <h3>
              <TextField  style = {{width:200}}
                label = "Add a due date" name ="duedate"
                onChange={this.handleChange}  value={duedate}
              />
              </h3>
              <h3>
              <TextField  style = {{width:200}}
                label = "Add the course id" name ="courseid"
                onChange={this.handleChange}  value={courseid}
              />
              </h3>
           <Button id="Add" color="primary" onClick={this.addAssignment}>Add</Button>
            <ToastContainer autoClose={1500}/> 
          </div>
          
        
      )
  }
}  

export default AddAssignment;