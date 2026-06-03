import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/AuthContext";

function SignUp() {
  const { currentUser, login } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let hasError = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = () => {
    if (!email) {
      setEmailError("Can't be empty");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Can't be empty");
      hasError = true;
    }
    if (!repeatPassword) {
      setRepeatPasswordError("Can't be empty");
      hasError = true;
    }
    if (hasError) return;
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      return;
    }
    login({ email });
    navigate("/");
  };

  return (
    <main className='min-h-screen flex  flex-col items-center justify-center gap-6 mx-auto px-4 font-outfit'>
      <img src={Logo} alt='Logo' />
      <form
        noValidate
        className='bg-blue900 p-8 rounded-lg w-full max-w-sm'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <h1 className='text-2xl font-light text-white font-outfit mb-6'>
          Sign Up
        </h1>
        <div
          className={`border-b ${emailError ? "border-red500" : "border-gray-700"} flex justify-between items-center mb-4`}>
          <label htmlFor='email' className='sr-only'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className='pb-2 placeholder-gray-500 w-full text-white bg-transparent outline-none flex-1'
          />
          {emailError && (
            <span className='text-red500 text-sm shrink-0'>{emailError}</span>
          )}
        </div>

        <div
          className={`border-b ${passwordError ? "border-red500" : "border-gray-700"} flex justify-between items-center mb-4`}>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            className='pb-2 placeholder-gray-500 w-full text-white bg-transparent outline-none flex-1'
          />
          {passwordError && (
            <span className='text-red500 text-sm shrink-0'>
              {passwordError}
            </span>
          )}
        </div>

        <div
          className={`border-b ${repeatPasswordError ? "border-red500" : "border-gray-700"} flex justify-between items-center mb-4`}>
          <label htmlFor='repeatPassword' className='sr-only'>
            Repeat Password
          </label>
          <input
            type='password'
            id='repeatPassword'
            placeholder='Repeat Password'
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setRepeatPasswordError("");
            }}
            className='pb-2 placeholder-gray-500 w-full text-white bg-transparent outline-none flex-1'
          />
          {repeatPasswordError && (
            <span className='text-red500 text-sm shrink-0'>
              {repeatPasswordError}
            </span>
          )}
        </div>
        <button
          type='submit'
          className='bg-red500 text-white py-4 px-4 mt-4 w-full rounded-md font-light hover:bg-red600 transition-colors duration-300 cursor-pointer'>
          Sign Up for an account
        </button>
        <p className='text-gray-300 mt-4 text-center font-light'>
          <Link to='/login'>
            Already have an account?{" "}
            <span className='text-red500 font-light'>Login</span>
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignUp;
