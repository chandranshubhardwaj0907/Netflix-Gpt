import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Input refs
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const nameValue = name.current ? name.current.value : "";

    // Validate input fields
    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL,
            })
          );
        })
        .catch((error) => {
          setErrorMessage(
            error.code === "auth/email-already-in-use"
              ? "The email address is already in use by another account."
              : error.message
          );
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const { uid, email, displayName, photoURL } = userCredential.user;
          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL,
            })
          );
          navigate("/browse");
        })
        .catch((error) => setErrorMessage(error.message));
    }
  };

  // Toggle between Sign In and Sign Up
  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="background"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full md:w-3/12 p-12 bg-black text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Name Input (Sign Up only) */}
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 rounded"
            />
          )}

          {/* Email Input */}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />

          {/* Password Input */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />

          {/* Error Message */}
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

          {/* Submit Button */}
          <button
            className="p-4 my-6 bg-sky-500 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle Form Type */}
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New User? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
