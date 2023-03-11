import { AddMeal } from "./AddMeal/AddMeal";
import "./App.css";
import { HomePage } from "./HomePage/HomePage";
import { MealsPage } from "./MealsPage/MealsPage";
import { Navbar } from "./Navbar And Footer/Navbar";
import { ProfilePage } from "./ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      {/* <MealsPage /> */}
      {/* <AddMeal /> */}
      {/* <ProfilePage /> */}
    </div>
  );
}

export default App;
