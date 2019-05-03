import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';

export default () => {
    const [action, setAction] = useState('logIn');
    const username = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');
    
    const requestSecret = useMutation(LOG_IN, { 
        variables : {
            // useInput은 value와 onChange를 주기 때문에 값을 가져오려면 .value를 해줘야 한다.
            email : email.value
        } 
    });

    const onLogin = e => {
        e.preventDefault();

        if(email !== '') {
            requestSecret();
        }
    };

    return <AuthPresenter setAction={ setAction } action={ action } username={ username }
        firstName={ firstName } lastName={ lastName } email={ email } onLogin={ onLogin } />;
};