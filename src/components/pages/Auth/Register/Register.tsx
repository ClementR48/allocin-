import { useState } from "react";
import axios from "axios";
import { INewUser } from "../../../Interfaces/UserInterfaces";



const Register = () => {
  const [user, setUser] = useState<INewUser>({
    firstname: "",
    lastname: "",
    city: "",
    postalCode: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<boolean>(false)

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
        console.log(response)
        setMessage(true)
      });
  };

  return (
    <form onSubmit={(e) => createUser(e)}>
      <label htmlFor="">
        Firstname
        <input
          type="text"
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        />
      </label>
      <label htmlFor="">
        Lastname
        <input
          type="text"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        />
      </label>
      <label htmlFor="">
        City
        <input
          type="text"
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
        />
      </label>
      <label htmlFor="">
        postalCode
        <input
          type="text"
          value={user.postalCode}
          onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
        />
      </label>
      <label htmlFor="">
        email
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label htmlFor="">
        password
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </label>
      <button>Submit</button>
      {message && <h2>`L'utilisateur {user.firstname} {user.lastname} a bien été créé`</h2>}
    </form>
  );
};

export default Register;
