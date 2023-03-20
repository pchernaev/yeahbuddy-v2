import "./style/ProfilePage.css"

export const ProfilePage = () => {
  return (
    <div id="profile-container">
      <h2>Profile</h2>
      <div className="profile-input">
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" />
      </div>
      <div className="profile-input">
        <label htmlFor="first_name">Last Name:</label>
        <input type="text" id="last_name" />
      </div>
      <div className="profile-input">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" />
      </div>
      <div className="profile-input">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
      </div>
      <div id="gender-container">
        <label>Gender:</label>
        <label htmlFor="male">Male</label>
        <input type="radio" name="gender" id="male" />
        <label htmlFor="female">Female</label>
        <input type="radio" name="gender" id="female" />
      </div>
      <div className="profile-input">
        <label htmlFor="height">Height:</label>
        <input type="number" id="height" />
      </div>
      <div className="profile-input">
        <label htmlFor="weight">Weight:</label>
        <input type="number" id="weight" />
      </div>
      <div className="profile-input">
        <label htmlFor="activity">Activity:</label>
        <select name="" id="activity">
          <option value=""></option>
        </select>
      </div>
      <div className="profile-input">
        <label htmlFor="goal">Goal:</label>
        <select name="" id="goal">
          <option value=""></option>
        </select>
      </div>
    </div>
  );
};
