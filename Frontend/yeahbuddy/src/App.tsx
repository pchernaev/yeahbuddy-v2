import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/add-meal" element={<AddMeal />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
