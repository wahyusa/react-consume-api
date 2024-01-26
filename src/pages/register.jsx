import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import useInput from "../hooks/useInput";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";

function Register() {
  const navigate = useNavigate();

  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const result = await register({ name, email, password });

    // if no error, redirect
    if (!result.error) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
          <a href="/"> NOTES APP </a>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <h1 className="font-bold text-2xl tracking-wide uppercase py-3">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="*:mt-4">
            <div>
              <InputLabel value="Name" />
              <Input
                id="name"
                className="block mt-1 w-full"
                type="text"
                name="name"
                required
                value={name}
                onChange={onNameChange}
              />
            </div>{" "}
            <div>
              <InputLabel value="Email address" />
              <Input
                id="email"
                className="block mt-1 w-full"
                type="text"
                name="email"
                required
                value={email}
                onChange={onEmailChange}
              />
            </div>{" "}
            <div>
              <InputLabel value="Password" />
              <Input
                id="password"
                className="block mt-1 w-full"
                type="password"
                name="password"
                required
                value={password}
                onChange={onPasswordChange}
              />
            </div>{" "}
            <div>
              <InputLabel value="Confirm password" />
              <Input
                id="confirmPassword"
                className="block mt-1 w-full"
                type="password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                href="{{ route('login') }}"
              >
                Already registered?
              </a>

              <Button className="ms-4">Register</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
