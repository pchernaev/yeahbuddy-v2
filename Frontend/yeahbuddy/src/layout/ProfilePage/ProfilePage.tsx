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
    activity: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

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
        <input type="text" id="first_name" defaultValue={userData.firstName} />
      </div>
      <div className="profile-input">
        <label htmlFor="first_name">Last Name:</label>
        <input type="text" id="last_name" defaultValue={userData.lastName} />
      </div>
      <div className="profile-input">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" defaultValue={userData.age} />
      </div>
      <div className="profile-input">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" defaultValue={userData.email} />
      </div>
      <div id="gender-container">
        <label>Gender:</label>
        <label htmlFor="male">Male</label>
        <input type="radio" name="gender" id="male" checked />
        <label htmlFor="female">Female</label>
        <input type="radio" name="gender" id="female" />
      </div>
      <div className="profile-input">
        <label htmlFor="height">Height:</label>
        <input type="number" id="height" defaultValue={userData.height} />
      </div>
      <div className="profile-input">
        <label htmlFor="weight">Weight:</label>
        <input type="number" id="weight" defaultValue={userData.weight} />
      </div>
      <div className="profile-input">
        <label htmlFor="activity">Activity:</label>
        <select name="" id="activity" defaultValue={userData.activity}>
          <option value="SEDENTARY">SEDENTARY</option>
          <option value="LIGHTLY">LIGHTLY</option>
          <option value="MODERATELY">MODERATELY</option>
          <option value="VERY">VERY</option>
          <option value="EXTRA">EXTRA</option>
        </select>
      </div>
      <div className="profile-input">
        <label htmlFor="goal">Goal:</label>
        <select name="" id="goal" defaultValue={userData.goal}>
          <option value="EXTREAM_CUT">EXTREAM_CUT</option>
          <option value="CUT">CUT</option>
          <option value="MAINTAIN">MAINTAIN</option>
          <option value="BULK">BULK</option>
          <option value="EXTREAM_BULK">EXTREAM_BULK</option>
        </select>
      </div>
    </div>
  );
};
