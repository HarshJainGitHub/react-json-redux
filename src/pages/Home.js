import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch , useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 900,
        marginTop:100
    },
});


const Home = () => {
    const classes = useStyles();
    const btnStyles = useButtonStyles();
    let dispatch = useDispatch();
    const {users} = useSelector(state => state.userData);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUsers());
    },[])

    const changeRoute = () => {
        navigate("/addUser");
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you wanted to delete User ? ")){
            dispatch(deleteUser(id));
        }
    }
  return (
      
    <div>
        <div className={btnStyles.root}>
            <Button variant='contained' color="primary" style={{ marginRight: '5px' }} onClick={() => changeRoute()}>ADD USER</Button>
        </div>
          <TableContainer component={Paper}>
              <Table className={classes.table} sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Contact</StyledTableCell>
                          <StyledTableCell align="center">Address</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {users && users.map((user) => (
                          <StyledTableRow key={user.id}>
                              <StyledTableCell component="th" scope="row">
                                  {user.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">{user.email}</StyledTableCell>
                              <StyledTableCell align="center">{user.contact}</StyledTableCell>
                              <StyledTableCell align="center">{user.address}</StyledTableCell>
                              <StyledTableCell align="center">
                                <div className={btnStyles.root}>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <Button style={{ marginRight: '5px' }} color="secondary" onClick={ () => handleDelete(user.id) }>Delete</Button>
                                        <Button color="primary" onClick={ () => navigate(`/editUser/${user.id}`)}>Edit</Button>
                                    </ButtonGroup>
                                </div>
                              </StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
    </div>
  )
  ;
}

export default Home;
