import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style/nav.css";

export const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("auth"));
  const history = useHistory();

  function handleLogout() {
    history.push("/home");
    localStorage.removeItem("auth");
    window.location.reload();
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>
        <li>
          <Link to="/workouts">Workouts</Link>
        </li>
        {token ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        )}
        {token ? (
          <li>
            <Link to="/home" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};
