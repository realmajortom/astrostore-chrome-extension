import React, {useState} from 'react';
import axios from 'axios';
import ChunkyButton from './inputs/ChunkyButton';
import {TextField} from './inputs/MaterialInputs';


function Login(props) {

    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');


    const loginUser = () => {
        if (user === '' || pass === '') {
            setMessage('Fields cannot be blank');
        } else {
            axios.post('https://astrostore.io/api/user/login',
                {username: user, password: pass}).then(res => {
                    if (res.data.success === true) {
                        localStorage.setItem('JWT', res.data.token);
                        setTimeout(() => {
                            props.update();
                        }, 10);
                    } else {
                        setMessage(res.data.message)
                    }
                }
            );
        }
    };


    return (
        <div className='container cSmall'>

            <div className='modalHeader'>Login</div>
            <div className='modalMessage'>{message}</div>

            <div className='fieldWrapper'>
                <TextField label='Username'
                           placeholder='REALHUMAN1'
                           value={user}
                           onChange={(e) => setUser(e.target.value)}/>

                <TextField type='password' label='Password'
                           placeholder='ROBOTS_UNITE'
                           value={pass}
                           onChange={(e) => setPass(e.target.value)}/>
            </div>

            <div className='submitWrapper'>
                <ChunkyButton onPress={() => loginUser()} text={'Log In'} type={'primary'}/>
            </div>

        </div>
    );
}

export default Login;