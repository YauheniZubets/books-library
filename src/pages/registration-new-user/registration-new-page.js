import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RegistrationNew } from "../../components/registration-new/registration-new";
import { RegNewUser } from "../../components/registration-new-user/registration-new-user";
import { RegNewUserMail } from "../../components/registration-new-user-mail/reg-new-user-mail";
import { NewUserResult } from "../../components/new-user-succ/newusersucc";

import { Preloader } from "../../components/preloader/preloader";

import { axiosNewUserStart } from "../../saga/reg-new-user-saga";

export const RegistrationNewUserPage = () => {

    const [registrationStage, setStage] = useState(1);
    const [newUserData, setNewUsedata] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const {isLoading, isError, userAlreadyLogged} = useSelector(state => state.regNewUser);
    const newRegistredUser = useSelector(state => state.regNewUser.newRegUser);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const changeUserData = (stage, arr) => {
        if (stage) setStage(stage);
        if (arr) setNewUsedata({...newUserData,
            username: arr[0],
            password: arr[1]
        })
    };

    const changeUserName = (stage, arr) => {
        if (stage) setStage(stage);
        if (arr) setNewUsedata({...newUserData,
            firstName: arr[0],
            lastName: arr[1]
        })
    };

    const changeUserMail = (mail, phoneNumb) => {
        if (mail && phoneNumb) setNewUsedata({...newUserData,
            email: mail,
            phone: phoneNumb
        })
    };

    const axiosAgainNewUser = () => {
        if (newUserData) dispatch(axiosNewUserStart(newUserData));
    }

    useEffect(()=> {
        if(newRegistredUser) setStage(4);
    }, [newRegistredUser]);

    useEffect(()=> {
        if(isError && !userAlreadyLogged) setStage(5);
    }, [isError, userAlreadyLogged]);

    useEffect(()=> {
        if(isError && userAlreadyLogged) setStage(6);
    }, [isError, userAlreadyLogged]);

    useEffect(()=>{
        if (localStorage.getItem('jwt')) navigate('/books/all');
    }, [navigate]);

    return (
        <section className='registration-page'>
            {
                isLoading && <Preloader />
            }
            <div className='registration-page-layout'>
                <div className='registration-page-layout-logo'>Cleverland</div>
                {registrationStage === 1 && <RegistrationNew changeStage = {changeUserData} registrationStage={registrationStage} />}
                {registrationStage === 2 && <RegNewUser changeStage = {changeUserName} registrationStage={registrationStage} />}  
                {registrationStage === 3 && <RegNewUserMail userDataFromPrev={newUserData} registrationStage={registrationStage} addUserMail={changeUserMail} />}  
                {registrationStage === 4 && <NewUserResult succ={true} err={false} />}
                {registrationStage === 5 && <NewUserResult succ={false} err={true} againToRegUserdata={axiosAgainNewUser} />}
                {registrationStage === 6 && <NewUserResult succ={false} err={false} logged={true} backToFirstStage={()=>setStage(1)} />}
            </div>
        </section>
    )
}