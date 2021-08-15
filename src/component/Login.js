import { Container, Grid, Button, TextField, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        boxShadow: theme.shadows[5],
        backgroundColor: theme.palette.background.paper,
        border: '0',
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const dummyCredential = [{
        username: 'admin',
        password: 'Admin123'
    },
    {
        username: 'nidhi',
        password: 'Nidhi456'
    },
    {
        username: 'syssmo',
        password: 'SYSTEM12'
    }
    ]

    const [loginData, setloginData] = useState({
        username: null,
        password: null,
        errors: {
            username: '',
            password: '',
        }
    });

    const [localData, setLocalData] = useState({
        username: '',
        password: '',
    })
    const { errors, username, password } = loginData;
    const validUsernameRegex = RegExp('^[a-zA-Z]*$')
    const validPasswordRegex = RegExp('^[a-zA-Z0-9]{8}$')
    const handleChange = (event) => {
        event.preventDefault();
        setLocalData({ ...localData, [event.target.name]: event.target.value })
        let temp = loginData.errors;
        switch (event.target.name) {
            case 'username':
                temp.username =
                    validUsernameRegex.test(event.target.value)
                        ? ''
                        : '*username is only in alphabets and no special char,symbol and space allow! ';
                break;
            case 'password':
                temp.password =
                    validPasswordRegex.test(event.target.value)
                        ? ''
                        : '*Password limit 8 alphanumericals only and space not allow!';
                break;
            default:
                break;
        }
        setloginData({ ...loginData, errors: temp })
    }

    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(loginData.errors)) {
            let user_entered = document.getElementById('userId').value

            let uId_checks = dummyCredential.some((credential) => (credential.username === user_entered))

            if (uId_checks) {
                let pass_entered = document.getElementById('passId').value
                let pass_checks = dummyCredential.some((credential) => (credential.password === pass_entered))
                if (pass_checks) {
                    props.setLogoutUser(true)
                    let list = [];
                    list.push(localData)
                    localStorage.setItem('login', JSON.stringify(list))
                }
                else {
                    alert("Invalid Credentials")
                }
            }
            else {
                alert("Invalid Credentials")
            }

        } else {
            alert("Invalid Credentials")
        }

    }

    const userDetails = JSON.parse(localStorage.getItem('login'));

    return (<>{props.logoutUser && userDetails && userDetails[0].username ?
        <TaskList />
        : <div style={{ paddingTop: "80px" }}>
            <Container className={classes.container} maxWidth="xs">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h2>Login Page</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        id='userId'
                                        label="Username"
                                        name="username"
                                        size="small"
                                        variant="outlined"
                                        value={username}
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errors.username.length > 0 &&
                                        <span style={{ color: 'red' }} className='error'>{errors.username}</span>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id='passId'
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errors.password.length > 0 &&
                                        <span style={{ color: 'red' }} className='error'>{errors.password}</span>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    }</>
    )
}
export default Login;