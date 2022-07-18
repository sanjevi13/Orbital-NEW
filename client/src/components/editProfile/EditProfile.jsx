import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { editProfile } from '../../apiCalls';
import { StarOutlineSharp } from '@mui/icons-material';

export default function EditProfile() {
  const {user, dispatch} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const city = useRef();
  const course = useRef();
  const status = useRef();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const res = await axios.post("/users/changeinfo", //update new user details to mongoDB 
    {
      email: user.email,
      newCity: city.current.value,
      newCourse: course.current.value,
      newRelationship: status.current.value,
    });
    editProfile( //calls dispatch to update the state
    {
      city: city.current.value,
      course: course.current.value,
      status: status.current.value
    }, 
    dispatch
    );
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile  
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update profile details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="City"
            type="email"
            fullWidth
            variant="standard"
            inputRef={city}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course"
            type="email"
            fullWidth
            variant="standard"
            inputRef={course}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status"
            type="email"
            fullWidth
            variant="standard"
            inputRef={status}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
