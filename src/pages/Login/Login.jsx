import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../shared/SocialLogin/SocialLogin";

const Login = () => {
  const [error, setError] = useState("");

  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | Task Management</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content ">
          <div className="card shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl text-center font-bold">Login</h1>
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    required
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <p className="text-red-600"> {error} </p>
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-outline"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
              <p className="my-4 text-center">
                New to Toy Cars..
                <Link className="text-orange-600 font-bold ms-1" to="/signup">
                  Sign Up
                </Link>
                <SocialLogin />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
