
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Dispatch, SetStateAction, useState } from "react";
import "./auth.css";

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const Auth = ({ setToken }: IProps) => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <main className="auth">
      <div className="right">
        <div className="image">
          <img
            src="https://assets.allocine.fr/skin/img/allocine/logo-main-light-4f269ddc69.svg"
            alt="logo"
          />
        </div>
        {isRegister ? (
          <>
            <Register setIsRegister={setIsRegister} />
          </>
        ) : (
          <>
            <Login setToken={setToken} setIsRegister={setIsRegister} />
          </>
        )}
      </div>
      <div className="left"></div>
    </main>
  );
};

export default Auth;
