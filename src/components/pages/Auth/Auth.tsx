import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const Auth = ({ setToken }: IProps) => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <main>
      <h1>Connection</h1>
      {isRegister ? (
        <>
          <Register />
          <p>
            Vous voulez vous connecter ? 
            <button onClick={() => setIsRegister(false)}>c'est par ici</button>
          </p>
        </>
      ) : (
        <>
          <Login setToken={setToken} />
          <p>
            Si vous n'avez pas encore de compte
            <button onClick={() => setIsRegister(true)}>Cliquez ici</button>
          </p>
        </>
      )}
    </main>
  );
};

export default Auth;
