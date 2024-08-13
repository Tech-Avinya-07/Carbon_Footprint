import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/store/auth";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({
          email: "",
          password: "",
        });

        navigate("/");
      } else if (res_data.error) {
        const newErrors = {};

        res_data.error.map((error) => {
          const field = error.path[0];
          const message = error.message;
          newErrors[field] = message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ global: res_data.message });
      }
    } catch (error) {
      console.log("register Error : " + error);
    }
  };

  return (
    <>
      <div>
        <div>{/* <img src="/images/register.png" alt="" /> */}</div>
        <div>
          <form onSubmit={handleSubmit}>
            {errors.global ? <p>{errors.global}</p> : ""}
            <br />
            <div>
              <label htmlFor="email">email : </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInput}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <br />
            <br />
            <div>
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInput}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <br />
            <br />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
