import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem("auth"));
    const history = useHistory();
    
     function handleLogout() {
       history.push("/home");
       localStorage.removeItem("auth");
       window.location.reload();
     }

     function handleLogoClick() {
      history.push("/home");
     }

  return (
    <div className="top-nav">
      <div className="icon-container">
        <i className="fa-solid fa-user"></i>
        <Link to="/profile" className="text">
          Profile
        </Link>
      </div>
      <div className="icon-container">
        <img
          src="data:image/png;base64,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"
          alt="Logo"
          className="logo"
          onClick={handleLogoClick}
        />
      </div>
      <div className="icon-container">
        <i className="fa-solid fa-right-from-bracket"></i>
        {token ? (
          <Link to="/home" onClick={handleLogout} className="text">
            Log out
          </Link>
        ) : (
          <Link to="/login" className="text">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};
