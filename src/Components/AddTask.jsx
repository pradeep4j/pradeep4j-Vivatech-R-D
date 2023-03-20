import React, { useState } from 'react';
import { Typography,FormControl, FormGroup, Button,styled,TextField,FormControlLabel,Checkbox,Stack} from '@mui/material';
import { addTask } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
const AddTask = () => {
    const navigate = useNavigate();
    const [reminder, setReminder] = useState(false);
    const [time, settime] = useState('');
    const initialValues = {
        task: "",
        day : "",
        time:""
    }
    const schema = Yup.object({
        task: Yup.string('')
          .required('Task Name is required!')
          .min(3,'Task Name should have of length minimum to 3!')
          .max(300,'Task Name should have of length minimum to 300!'),
        day: Yup.string('')
          .required('Day is required!'),
        time: Yup.string('')
          .required('Time is required!')
      }); 
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
          onSubmit: (values,{ resetForm }) => {
           onAddTask(values, resetForm);
        }
    });
    const onAddTask = async(val) => {
        const postBody = {
            task:val.task,
            day:val.day,
            time:val.time,
            reminder:reminder
        }
        await addTask(postBody);
        navigate('/all');
    }
    


    return (
    <Container maxWidth="sm">
        <Typography variant="h5">Add Task Card <Ptags>(All the field having * are required)</Ptags></Typography>
      <FormControl>
                    <TextField value={formik.values.task} 
                            required='required'
                            id="task"
                            name="task" 
                           // label="Email"  
                            label="Add Task Card"
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            error={formik.touched.task && Boolean(formik.errors.task)}
                            helperText={formik.touched.task && formik.errors.task} />
                </FormControl> 
                <FormControl>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField value={formik.values.day} 
                            required='required'
                            id="day"
                            name="day" 
                           // label="Email"  
                            label="Date"
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            type="date"
                            defaultValue={new Date()}
                            sx={{ width: 420 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={formik.touched.day && Boolean(formik.errors.day)}
                            helperText={formik.touched.day && formik.errors.day} />
                    </Stack>
                </FormControl> 
                <FormControl>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField value={formik.values.time} 
                            required='required'
                            id="time"
                            name="time" 
                           // label="Email"  
                            label="Time"
                            onChange={formik.handleChange} 
                            inputProps={{ maxLength: 50 }}
                            type="time"
                            defaultValue={new Date()}
                            sx={{ width: 420 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={formik.touched.time && Boolean(formik.errors.time)}
                            helperText={formik.touched.time && formik.errors.time} />
                    </Stack>
                </FormControl>                 
                <FormControl>
                    <FormControlLabel control={<Checkbox /*defaultChecked*/ />} 
                             value={formik.values.reminder}
                            label="Reminder" 
                            id="reminder" 
                            name="reminder" 
                            checked={reminder} 
                            onChange={(e) => setReminder(e.target.checked)}
                    />
                </FormControl>
                <FormControl>
                    <Buttons variant="contained" type="submit" id="submitting" onClick={formik.handleSubmit}>Save Task</Buttons>
                </FormControl>
    </Container>
  );
};

export default AddTask;
const Container = styled(FormGroup)`
width: 30%;
margin: 3% auto 0 auto;
& > div {
    margin-top:10px;
}
`
const Ptags =  styled('p')`
font-size:10px;
`
const Buttons =  styled(Button)`
width: 100%;
`