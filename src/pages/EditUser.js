import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate , useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/action';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const EditUser = () => {
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    });

    const { name, email, contact, address } = userState;
    const [error, setErrorState] = useState('');

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let {id} = useParams();
    const { user } = useSelector((state) => state.userData);
    const classes = useStyles();

    useEffect( () => {
        dispatch(getSingleUser(id))
    },[]);

    useEffect( () => {
        if(user){
            setUserState({
                ...user
            });
        }
    }, [])

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setUserState({ ...userState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !address || !email || !contact) {
            setErrorState("Please fill all the input fields");
        }
        else {
            dispatch(updateUser(userState, id));
            navigate('/');
            setErrorState('');
        }
    };

    return (
        <div>
            <Button style={{ width: "100px", marginTop: '20px' }}
                variant="contained" color="secondary" onClick={() => navigate('/')}>Go Back</Button>
            <h2>Edit User</h2>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Enter Name" value={name || ""} type="text" name="name" onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="Enter Email" value={email || ""} type="email" name="email" onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="Enter Contact" value={contact || ""} type="number" name="contact" onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="Enter Address" value={address || ""} type="text" name="address" onChange={handleInputChange} />
                <br />
                <Button style={{ width: "100px" }} onChange={handleInputChange}
                    variant="contained" color="primary" type="submit">UPDATE</Button>
            </form>
        </div>
    );
}

export default EditUser;
