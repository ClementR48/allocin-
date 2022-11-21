import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserLogin {
  email: string;
  password: string;
}

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const Login = ({ setToken }: IProps) => {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = (e: any) => {
    e.preventDefault();
    axios
      .post("https://api-ri7.herokuapp.com/api/users/login", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then((response) => {
        setToken(response.data.token);
        sessionStorage.setItem("tokenUser", response.data.token);
      })
      .then(() => navigate("/"));
  };

  return (
    <form onSubmit={(e) => loginUser(e)}>
      <label htmlFor="">
        email
        <input
          type="text"
          value={userLogin.email}
          onChange={(e) =>
            setUserLogin({ ...userLogin, email: e.target.value })
          }
        />
      </label>
      <label htmlFor="">
        password
        <input
          type="password"
          value={userLogin.password}
          onChange={(e) =>
            setUserLogin({ ...userLogin, password: e.target.value })
          }
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default Login;
