import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MealsToDisplay from "../../model/MealsToDisplay";
import "./style/ProfilePage.css";
import { Audio } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext";

export const ProfilePage = () => {
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    email: "",
    weight: "",
    height: "",
    goal: "",
    activity: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [haveChanges, setHaveChanges] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      const url: string = `http://localhost:8080/api/v1/user/email=${user.email}`;
      axios.get(url).then(function (response) {
        const responseData = response.data;
        setUserData(responseData);
        setIsLoading(false);
      });
    };
    fetchProfile().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  function changeAge(e: any) {
    setUserData(() => {
      const user = userData;
      user.age = e.target.value;
      return user;
    });
    setHaveChanges(true);
  }

  function changeHeight(e: any) {
    setUserData(() => {
      const user = userData;
      user.height = e.target.value;
      return user;
    });
    setHaveChanges(true);
  }

  function changeWeight(e: any) {
    setUserData(() => {
      const user = userData;
      user.weight = e.target.value;
      return user;
    });
    setHaveChanges(true);
  }

  function changeActivity(e: any) {
    setUserData(() => {
      const user = userData;
      user.activity = e.target.value;
      return user;
    });
    setHaveChanges(true);
  }

  function changeGoal(e: any) {
    setUserData(() => {
      const user = userData;
      user.goal = e.target.value;
      return user;
    });
    setHaveChanges(true);
  }

  function saveChanges() {
    axios.post("http://localhost:8080/api/v1/user", userData);
    setHaveChanges(false);
  }

  if (isLoading) {
    return <Audio height="80" width="80" color="blue" ariaLabel="loading" />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div id="profile-container">
      <h2>Profile</h2>
      <div className="profile-input">
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          defaultValue={userData.firstName}
          readOnly
        />
      </div>
      <div className="profile-input">
        <label htmlFor="first_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          defaultValue={userData.lastName}
          readOnly
        />
      </div>
      <div className="profile-input">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          defaultValue={userData.age}
          onChange={changeAge}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" defaultValue={userData.email} readOnly />
      </div>
      <div className="profile-input">
        <label>Gender:</label>
        <input
          type="text"
          id="gender"
          defaultValue={userData.gender}
          readOnly
        />
      </div>
      <div className="profile-input">
        <label htmlFor="height">Height:</label>
        <input
          type="number"
          id="height"
          defaultValue={userData.height}
          onChange={changeHeight}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          defaultValue={userData.weight}
          onChange={changeWeight}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="activity">Activity:</label>
        <select
          name=""
          id="activity"
          defaultValue={userData.activity}
          onChange={changeActivity}
        >
          <option value="SEDENTARY">SEDENTARY</option>
          <option value="LIGHTLY">LIGHTLY</option>
          <option value="MODERATELY">MODERATELY</option>
          <option value="VERY">VERY</option>
          <option value="EXTRA">EXTRA</option>
        </select>
      </div>
      <div className="profile-input">
        <label htmlFor="goal">Goal:</label>
        <select
          name=""
          id="goal"
          defaultValue={userData.goal}
          onChange={changeGoal}
        >
          <option value="EXTREAM_CUT">EXTREAM CUT</option>
          <option value="CUT">CUT</option>
          <option value="MAINTAIN">MAINTAIN</option>
          <option value="BULK">BULK</option>
          <option value="EXTREAM_BULK">EXTREAM BULK</option>
        </select>
      </div>
      {haveChanges ? (
        <div className="button-div">
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
