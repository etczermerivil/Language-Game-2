import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className={`nav-box ${isLandingPage ? "landing-page" : ""}`}>
      <nav className="navbar">
        <ul className="nav-menu">
          {/* Show WP logo only if NOT on the landing page */}
          {!isLandingPage && (
            <li className="nav-item logo-item">
              <div className="logo-box">
                <NavLink to="/" className="nav-link">
                  <span className="word" data-index="1">WP</span>
                </NavLink>
              </div>
            </li>
          )}

          {/* NEW NAV ITEMS */}
          <li className="nav-item">
            <NavLink to="/colors" className="nav-link">
              Parts Of Speech
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cards" className="nav-link">
              Cards
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/languages" className="nav-link">
              Languages
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/decks" className="nav-link">
              Decks
            </NavLink>
          </li>

          {/* PROFILE BUTTON (HAMBURGER) */}
          <li className="nav-item profile-item">
            <ProfileButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;





// function App() {
//   return (
//     <>
//       {/* Comment out Navigation */}
//       {/* <Navigation /> */}
//       <div>
//         {/* Other content */}
//       </div>
//     </>
//   );
// }

// export default App;
