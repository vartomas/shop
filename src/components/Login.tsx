import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUser } from '@/store/useUser';
import Button from './Button';
import TextInput from './TextInput';

const signInSchema = yup.object().shape({
  email: yup.string().required('Email required'),
  password: yup.string().required('Password requried'),
});

const signUpSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please repeat the password'),
});

type SignInForm = yup.InferType<typeof signInSchema>;
type SignUpForm = yup.InferType<typeof signUpSchema>;

const Login = () => {
  const [loginView, setLoginView] = useState(true);
  const [error, setError] = useState('');
  const { loading, signUp, login } = useUser();

  const signInForm = useForm<SignInForm>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpForm>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '', repeatPassword: '' },
    resolver: yupResolver(signUpSchema),
  });

  const submitSignIn = signInForm.handleSubmit((formValues) => {
    login(formValues.email, formValues.password);
  });
  const submitSignUp = signUpForm.handleSubmit((formValues) => signUp(formValues.email, formValues.password));

  return (
    <>
      {loginView ? (
        <form onSubmit={submitSignIn}>
          <h2 className="login__header">Sign in</h2>
          <TextInput name="email" label="Email" type="email" form={signInForm} />
          <TextInput name="password" label="Password" type="password" form={signInForm} />
          <p>{error}</p>
          <div className="login__button-container">
            <Button title="Log in" type="submit" disabled={loading} onClick={submitSignIn} />
          </div>
          <p className="login__helper-text">
            Dont have account?{' '}
            <span
              className="login__helper-text__link"
              onClick={() => {
                setLoginView(false);
                setError('');
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={submitSignUp}>
          <h2 className="login__header">Sign up</h2>
          <TextInput name="email" label="Email" type="email" form={signUpForm} />
          <TextInput name="password" label="Password" type="password" form={signUpForm} />
          <TextInput name="repeatPassword" label="Repeat password" type="password" form={signUpForm} />
          <p>{error}</p>
          <div className="login__button-container">
            <Button title="Sign up" type="submit" disabled={loading} onClick={submitSignUp} />
          </div>
          <p className="login__helper-text">
            Already have account?{' '}
            <span
              className="login__helper-text__link"
              onClick={() => {
                setLoginView(true);
                setError('');
              }}
            >
              Sign in
            </span>
          </p>
        </form>
      )}
    </>
  );
};

export default Login;
