import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { MyContext, Icontext } from "../../../../store/AppContext";
import { listRoutes } from "../../../Router";

interface UserLogin {
  email: string;
  password: string;
}

interface IProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setIsRegister }: IProps) => {
  const { store, setStore } = useContext(MyContext) as Icontext;
  const [error, setError] = useState<string>("");

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
        sessionStorage.setItem("tokenUser", response.data.token);
        setStore({
          ...store,
          isUserAuth: response.data.token,
        });
        navigate(listRoutes.MOVIESPAGE);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
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
        <p style={{ fontSize: "12px", fontStyle: "italic" }}>{error}</p>
      </form>
      <p className="no-compte">
        Si vous n'avez pas encore de compte?
        <button onClick={() => setIsRegister(true)}>Inscrivez-vous</button>
      </p>
    </div>
  );
};

export default Login;
