import { useState, Dispatch, SetStateAction, useContext } from "react";
import axios from "axios";
import { MyContext, Icontext } from "../../../../store/AppContext";

interface IProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
}

const Register = ({ setIsRegister }: IProps) => {
  const { store, setStore } = useContext(MyContext) as Icontext;

  const [message, setMessage] = useState<string>("");

  const createUser = (e: any) => {
    e.preventDefault();
    axios
      .post("https://api-ri7.herokuapp.com/api/users/register", {
        avatar: store.user.avatar,
        firstname: store.user.firstname,
        lastname: store.user.lastname,
        city: store.user.city,
        postalCode: store.user.postalCode,
        email: store.user.email,
        password: store.user.password,
      })
      .then((res) => {
        setMessage(
          `L'utilisateur ${store.user.firstname} ${store.user.lastname} a bien été créé`
        );
        setTimeout(() => {
          setIsRegister(false);
        }, 2000);
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };

  return (
    <div className="register">
      <h1>INSCRIVEZ-VOUS EN 2 SECONDES</h1>
      <form onSubmit={(e) => createUser(e)}>
        <input
          type="text"
          placeholder="AVATAR"
          value={store.user.avatar}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, avatar: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="PRENOM"
          value={store.user.firstname}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, firstname: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="NOM"
          value={store.user.lastname}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, lastname: e.target.value },
            })
          }
        />

        <input
          type="text"
          placeholder="VILLE"
          value={store.user.city}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, city: e.target.value },
            })
          }
        />

        <input
          type="text"
          placeholder="CODE POSTAL"
          value={store.user.postalCode}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, postalCode: e.target.value },
            })
          }
        />

        <input
          type="text"
          placeholder="EMAIL"
          value={store.user.email}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, email: e.target.value },
            })
          }
        />

        <input
          type="password"
          placeholder="MOT DE PASSE"
          value={store.user.password}
          onChange={(e) =>
            setStore({
              ...store,
              user: { ...store.user, password: e.target.value },
            })
          }
        />

        <button className="btn-login">CONTINUER</button>

        <p
          style={{
            fontSize: "14px",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      </form>
      <p className="login-account">
        Déjà un compte
        <button onClick={() => setIsRegister(false)}>Connectez-vous</button>
      </p>
    </div>
  );
};

export default Register;
