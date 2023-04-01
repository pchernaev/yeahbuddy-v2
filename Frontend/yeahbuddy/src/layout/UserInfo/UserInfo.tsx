import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Audio } from "react-loader-spinner";
import "./style/UserInfo.css";
import { useHistory } from "react-router-dom";

export const UserInfo = () => {
  const [id, setId] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState("MODERATELY");
  const [goal, setGoal] = useState("MAINTAIN");

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const url: string = `http://localhost:8080/api/v1/user/email=${user.email}`;
      axios.get(url).then(function (response) {
        const responseData = response.data;
        setId(responseData.id);
        setIsLoading(false);
      });
    }
    fetchUser().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  function changeAge(e: any) {
    setAge(e.target.value);
  }

  function changeGender(e: any) {
    setGender(e.target.value);
  }

  function changeWeight(e: any) {
    setWeight(e.target.value);
  }

  function changeHeight(e: any) {
    setHeight(e.target.value);
  }

  function changeActivity(e: any) {
    setActivity(e.target.value);
  }

  function changeGoal(e: any) {
    setGoal(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const userInfo = {
      id: id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: age,
      gender: gender,
      weight: weight,
      height: height,
      activity: activity,
      goal: goal,
    };
    await axios.post("http://localhost:8080/api/v1/user/info", userInfo);
    history.push("/home");
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
    <div id="userinfo-container">
      <form onSubmit={handleSubmit}>
        <h2>About you</h2>
        <div className="profile-input">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" onChange={changeAge} />
        </div>
        <div id="gender-container">
          <label>Gender:</label>
          <label>Male: </label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="MALE"
            onClick={changeGender}
          />
          <label>Female: </label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="FEMALE"
            onClick={changeGender}
          />
        </div>
        <div className="profile-input">
          <label htmlFor="height">Height:</label>
          <input type="number" id="height" onChange={changeHeight} />
        </div>
        <div className="profile-input">
          <label htmlFor="weight">Weight:</label>
          <input type="number" id="weight" onChange={changeWeight} />
        </div>
        <div className="profile-input">
          <label htmlFor="activity">Activity:</label>
          <select
            name=""
            id="activity"
            defaultValue={"MODERATELY"}
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
            defaultValue={"MAINTAIN"}
            onChange={changeGoal}
          >
            <option value="EXTREAM_CUT">EXTREAM CUT</option>
            <option value="CUT">CUT</option>
            <option value="MAINTAIN">MAINTAIN</option>
            <option value="BULK">BULK</option>
            <option value="EXTREAM_BULK">EXTREAM BULK</option>
          </select>
        </div>
        <div className="button-div">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
