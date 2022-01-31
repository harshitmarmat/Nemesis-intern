import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const authCtx = useContext(AuthContext);
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authenthicationHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const emailInput = emailInputRef.current.value;
    const passInput = passInputRef.current.value;

    console.log(emailInput);
    console.log(passInput);

    let url ;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-5z6SeUBW2DtXNRKBoI8aXUtB9gpVYLc'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-5z6SeUBW2DtXNRKBoI8aXUtB9gpVYLc'
    }
    fetch(url,
      {
        method : 'POST',
        body : JSON.stringify({
          email : emailInput,
          password : passInput
        }),
        headers : {
          'content-type' : 'application/JSON'
        }
      }
    ).then(res => {
      setIsLoading(false);
      if(res.ok){
        return res.json();
      }else{
        return (res.json().then(data=> {
          let errorMessage = "Authentication Failed";
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        }))
      }
    }).then((data)=>{
      console.log(data);
      console.log(new Date(new Date().getTime() + (+data.expiresIn)*1000).getTime());
      authCtx.login(data.idToken);
      history.replace('/');
    }).catch((error)=>{
      alert(error.message)
    })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={authenthicationHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
