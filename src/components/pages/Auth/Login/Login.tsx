import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

interface UserLogin {
  email: string;
  password: string;
}

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
  setIsRegister: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setToken, setIsRegister }: IProps) => {
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
    <div className="login">
      <h1>CONNECTEZ-VOUS</h1>
      <form onSubmit={(e) => loginUser(e)}>
        <input
          type="text"
          placeholder="EMAIL"
          value={userLogin.email}
          onChange={(e) =>
            setUserLogin({ ...userLogin, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="MOT DE PASSE"
          value={userLogin.password}
          onChange={(e) =>
            setUserLogin({ ...userLogin, password: e.target.value })
          }
        />
        <span className="forgot-password">Mot de passe oublié ?</span>

        <button className="btn-login">SE CONNECTER</button>
      </form>
      <p className="no-compte">
        Si vous n'avez pas encore de compte?
        <button onClick={() => setIsRegister(true)}>Inscrivez-vous</button>
      </p>
    </div>
  );
};

export default Login;
