import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/api";
import useInput from "../hooks/useInput";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";

function Login({ loginSuccess }) {
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput("witmiqonq@wtoqjt.com");
  const [password, onPasswordChange] = useInput("123456");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate("/");
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
            Login
          </h1>
          <form onSubmit={handleSubmit} className="*:mt-4">
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
            <div className="flex items-center justify-end mt-4">
              <Link
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                to="/register"
              >
                Don't have account ? create here!
              </Link>
              <Button className="ms-4">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default Login;
