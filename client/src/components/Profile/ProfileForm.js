import AuthContext from '../../store/auth-context';
import { useContext, useEffect, useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const [userDetail,setUserDetail] = useState({});

  useEffect(()=>{
    //fetch user detail from backend
  },[])

  return (
    <div className={classes.container}>
        <ul>
          <li>Name <span>: {userDetail.name}</span></li>
          <li>User <span>: {userDetail.username}</span></li>
          <li>Phone <span>: {userDetail.phoneNumber}</span></li>
          <li>Address <span>: {userDetail.address}</span></li>
        </ul>
    </div>
  );
}

export default ProfileForm;
