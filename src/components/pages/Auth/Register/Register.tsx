import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { INewUser } from "../../../Interfaces/UserInterfaces";

interface IProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
}

const Register = ({ setIsRegister }: IProps) => {
  const [user, setUser] = useState<INewUser>({
    firstname: "",
    lastname: "",
    city: "",
    postalCode: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<boolean>(false);

  const createUser = (e: any) => {
    e.preventDefault();
    axios
      .post("https://api-ri7.herokuapp.com/api/users/register", {
        firstname: user.firstname,
        lastname: user.lastname,
        city: user.city,
        postalCode: user.postalCode,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response);
        setMessage(true);
      });
  };

  return (
    <div className="register">
      <h1>INSCRIVEZ-VOUS EN 2 SECONDES</h1>
      <form onSubmit={(e) => createUser(e)}>
        <input
          type="text"
          placeholder="PRENOM"
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        />

        <input
          type="text"
          placeholder="NOM"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        />

        <input
          type="text"
          placeholder="VILLE"
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
        />

        <input
          type="text"
          placeholder="CODE POSTAL"
          value={user.postalCode}
          onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
        />

        <input
          type="text"
          placeholder="EMAIL"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="MOT DE PASSE"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="btn-login">CONTINUER</button>
        {message && (
          <h2>
            `L'utilisateur {user.firstname} {user.lastname} a bien été créé`
          </h2>
        )}
      </form>
      <p className="login-account">
        Déjà un compte
        <button onClick={() => setIsRegister(false)}>Connectez-vous</button>
      </p>
    </div>
  );
};

export default Register;
