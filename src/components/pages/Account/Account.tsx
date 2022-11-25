import {
  useEffect,
  useState,
  useContext,
} from "react";

import Loader from "../../Loader/Loader";
import { fetchData } from "../../../utils/FetchData";

import axios from "axios";
import "./account.css";
import { MyContext, Icontext } from "../../../store/AppContext";

const Account = () => {
  const { store, setStore } = useContext(MyContext) as Icontext;
  const [message, setMessage] = useState<string>("");
  const [updateView, setUpdateView] = useState(false);

  useEffect(() => {
    const auth = `Bearer ${sessionStorage.getItem("tokenUser")}`;
    const url = `https://api-ri7.herokuapp.com/api/users/profile`;

    fetchData(url, setStore, store, "myAccount", auth);
  }, []);

  const deconnection = () => {
    sessionStorage.clear();
    setStore({
      ...store,
      isUserAuth: null,
      user: {
        avatar: "",
        firstname: "",
        lastname: "",
        city: "",
        postalCode: "",
        email: "",
        password: "",
      },
    });
  };

  const updateUser = async (e: any) => {
    e.preventDefault();
    const url = "https://api-ri7.herokuapp.com/api/users/profile";

    await axios
      .put(url, store.user, {
        headers: { Authorization: sessionStorage.getItem("tokenUser") },
      })
      .then((res) => {
        setMessage("Votre profil a bien été modifié");
        setTimeout(() => {
          setUpdateView(false);
          setMessage("");
        }, 2000);
      })
      .catch((err) => {
        setMessage("erreur");
      });
  };

  if (store.loading) return <Loader />;
  if (store.error) return <h1>{store.error}</h1>;
  return (
    <main className="my-account">
      <h1>MON COMPTE</h1>
      {!updateView ? (
        <div className="info-user">
          <img
            className="user-avatar"
            src={
              store.user.avatar
                ? store.user.avatar
                : "https://fr.web.img6.acsta.net/c_80_80/commons/v9/common/empty/empty_avatar.png"
            }
            width="80"
            height="80"
            alt="avatar-user"
          ></img>
          <span>{`${store.user?.firstname} ${store.user?.lastname}`}</span>
          <span>{store.user?.city}</span>
          <span>{store.user?.postalCode}</span>
          <span>{store.user?.email}</span>
        </div>
      ) : (
        <div className="form-update">
          <form onSubmit={(e) => updateUser(e)}>
            <input
              placeholder="FIRSTNAME"
              type="text"
              value={store.user?.firstname}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, firstname: e.target.value },
                })
              }
            />

            <input
              placeholder="LASTNAME"
              type="text"
              value={store.user?.lastname}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, lastname: e.target.value },
                })
              }
            />

            <input
              placeholder="CITY"
              type="text"
              value={store.user?.city}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, city: e.target.value },
                })
              }
            />

            <input
              placeholder="POSTALCODE"
              type="text"
              value={store.user?.postalCode}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, postalCode: e.target.value },
                })
              }
            />

            <input
              placeholder="EMAIL"
              type="text"
              value={store.user?.email}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, email: e.target.value },
                })
              }
            />
            <input
              placeholder="AVATAR"
              type="text"
              value={store.user?.avatar}
              onChange={(e) =>
                setStore({
                  ...store,
                  user: { ...store.user, avatar: e.target.value },
                })
              }
            />

            <button>MODIFIER</button>
            <p style={{ fontSize: "14px", fontStyle: "italic" }}>{message}</p>
          </form>
        </div>
      )}
      <div className="btn-modif">
        <button onClick={deconnection}>Se déconnecter</button>
        <button onClick={() => setUpdateView((prev) => !prev)}>
          {!updateView ? "Modifier ma fiche" : "Voir ma fiche"}
        </button>
      </div>
    </main>
  );
};

export default Account;
