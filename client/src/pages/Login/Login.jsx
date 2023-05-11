import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
//Custom
import Logo from '../../assets/logo/arkangel_logo_white_orange.png';
import BlobButton from '../../ui/BlobButton/BlobButton';
import Loader from '../../ui/Loader/Loader';
import { UserContext } from '../../App';
import { login, signup } from '../../api/auth';
import {
  ButtonContainer,
  Credential,
  FormContainer,
  LoginContainer,
  LoginForm,
  LoginNavigationText,
  StatusText
} from './LoginStyle';
//MUI
import { useMediaQuery, useTheme } from '@mui/material';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorData, setErrorData] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (user) {
    return <Navigate to={'/'} />;
  }

  const handleSignupNavigation = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setIsLogin(false);
    setIsSignup(true);
    setErrorData(null);
  };

  const handleLoginNavigation = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setIsLogin(true);
    setIsSignup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorData(null);

    const loginFormData = new FormData();
    loginFormData.append('username', username);
    loginFormData.append('password', password);

    try {
      const res = await login(loginFormData);
      if (res.data.success) {
        console.log(res.data.message);
        setUser(res.data.data);

        setTimeout(() => {
          setIsLoading(false);
          if (location.state?.from) navigate(location.state.from);
          else navigate('/');
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorData(error.response?.data);
        setIsLoading(false);
      }, 1500);
    }
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorData(null);

    const signupFormData = new FormData();
    signupFormData.append('username', username);
    signupFormData.append('email', email);
    signupFormData.append('password', password);

    try {
      const res = await signup(signupFormData);
      if (res.data.success) {
        console.log(res.data.message);

        const delayDebounce = setTimeout(() => {
          setEmail('');
          setPassword('');
          setUsername('');
          setIsLoading(false);
          setIsLogin(true);
          setIsSignup(false);
        }, 1500);

        return () => clearTimeout(delayDebounce);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorData(error.response?.data);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <LoginContainer>
      <FormContainer isMobile={isMobile}>
        <img alt={'logo'} src={Logo} width={'300px'} />
        {isLogin && (
          <LoginForm onSubmit={handleSubmit}>
            <Credential
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Credential
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StatusText>{errorData?.message}</StatusText>
            <ButtonContainer>
              {isLoading ? (
                <Loader color={'white'} />
              ) : (
                <BlobButton name={'Log In'} type={'submit'} />
              )}
            </ButtonContainer>
            <LoginNavigationText onClick={handleSignupNavigation} isNavigating={true}>
              Don't have an account? Signup Here.
            </LoginNavigationText>
          </LoginForm>
        )}
        {isSignup && (
          <LoginForm onSubmit={handleSignup} padding={2}>
            <LoginNavigationText isNavigating={false}>
              Enter the email associated with your account below:
            </LoginNavigationText>
            <Credential
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Credential
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Credential
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StatusText>{errorData?.message}</StatusText>
            <ButtonContainer>
              {isLoading ? (
                <Loader color={'white'} />
              ) : (
                <BlobButton name={'Signup'} type={'submit'} />
              )}
            </ButtonContainer>
            <LoginNavigationText onClick={handleLoginNavigation} isNavigating={true}>
              Back To Login
            </LoginNavigationText>
          </LoginForm>
        )}
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
