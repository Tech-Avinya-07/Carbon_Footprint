import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const userData = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

function Register() {
  const [user, setUser] = useState(userData);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser(userData);

        navigate("/");
      } else {
        const newErrors = {};

        res_data.error.map((error) => {
          const field = error.path[0];
          const message = error.message;
          newErrors[field] = message;
        });

        setErrors(newErrors);
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
            <br />
            <div>
              <label htmlFor="username">Username : </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="username"
                id="username"
                value={user.username}
                onChange={handleInput}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <br />
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
              <label htmlFor="phone">Phone Number : </label>
              <input
                type="number"
                placeholder="Enter your phone"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={handleInput}
              />
              {errors.phone && <p>{errors.phone}</p>}
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
            <button>Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
