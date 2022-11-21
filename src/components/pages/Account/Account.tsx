import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { INewUser } from "../../Interfaces/UserInterfaces";
import Loader from "../../Loader/Loader";
import { fetchData, updateData } from "../../utils/FetchData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IProps {
  setToken: Dispatch<SetStateAction<string>>;
}

const Account = ({ setToken }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<INewUser>({
    firstname: "",
    lastname: "",
    city: "",
    postalCode: "",
    email: "",
    password: "",
  });
  const [updateView, setUpdateView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const objState = {
      setLoading,
      mainState: setUserInfo,
      headers: `Bearer ${sessionStorage.getItem("tokenUser")}`,
    };
    const url = `https://api-ri7.herokuapp.com/api/users/profile`;

    fetchData(url, objState);
  }, []);

  const deconnection = () => {
    sessionStorage.clear();
    setToken("");
    navigate("/authentification");
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const url = "https://api-ri7.herokuapp.com/api/users/profile";

    await axios
      .put(url, userInfo, {
        headers: { Authorization: sessionStorage.getItem("tokenUser") },
      })
      .then((res) => console.log(res));
  };

  if (loading) return <Loader />;
  return (
    <main>
      <h1>Mon compte</h1>
      {!updateView ? (
        <>
          <span>{userInfo?.firstname}</span>
          <span>{userInfo?.lastname}</span>
          <span>{userInfo?.city}</span>
          <span>{userInfo?.postalCode}</span>
          <span>{userInfo?.email}</span>
        </>
      ) : (
        <form onSubmit={(e) => updateUser(e)}>
          <label htmlFor="">
            Firstname
            <input
              type="text"
              value={userInfo?.firstname}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstname: e.target.value })
              }
            />
          </label>
          <label htmlFor="">
            Lastname
            <input
              type="text"
              value={userInfo?.lastname}
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastname: e.target.value })
              }
            />
          </label>
          <label htmlFor="">
            City
            <input
              type="text"
              value={userInfo?.city}
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            />
          </label>
          <label htmlFor="">
            postalCode
            <input
              type="text"
              value={userInfo?.postalCode}
              onChange={(e) =>
                setUserInfo({ ...userInfo, postalCode: e.target.value })
              }
            />
          </label>
          <label htmlFor="">
            email
            <input
              type="text"
              value={userInfo?.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </label>
          <label htmlFor="">
            password
            <input
              type="password"
              value={userInfo?.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
          </label>
          <button>Submit</button>
        </form>
      )}

      <button onClick={deconnection}>Se déconnecter</button>
      <button onClick={() => setUpdateView((prev) => !prev)}>
        Modifier ma fiche
      </button>
    </main>
  );
};

export default Account;
