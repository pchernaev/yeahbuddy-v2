import "./style/nav.css";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/meals">Meals</a>
        </li>
        <li>
          <a href="/workouts">Workouts</a>
        </li>
        <li>
          <a href="/login">Log in</a>
        </li>
        <li>
          <a href="/logout">Log out</a>
        </li>
      </ul>
    </nav>
  );
};
