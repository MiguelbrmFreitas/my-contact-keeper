import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

export const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_conf: ''
    })

    const { name, email, password, password_conf } = user;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error != null && error.msg === 'Email already exists') {
            setAlert(error.msg, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onChange = e => {
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email == '' || password == '' || password_conf == '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password_conf) {
            setAlert('Please provide equal passwords', 'danger');
        } else {
            register({
                name,
                email,
                password
            })
        }
        
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-prumary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="text" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div className="form-group">
                    <label htmlFor="password_conf">
                        Confirm Password
                    </label>
                    <input type="password" name="password_conf" value={password_conf} onChange={onChange} required minLength="6" />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register