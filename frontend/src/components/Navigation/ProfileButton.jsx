import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setMenuOpen(false); // Close the dropdown
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="profile-container">
      {/* Hamburger Icon */}
      <div className="hamburgerMenu" onClick={toggleMenu}>
        <div className="hamburgerIcon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="dropdownMenu">
          {user ? (
            <>
              <div className="dropdownItem">Welcome, {user.username}</div>
              <button onClick={logout} className="dropdownItem">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="dropdownItem">
                <OpenModalMenuItem
                  itemText="Log In"
                  modalComponent={<LoginFormModal closeMenu={() => setMenuOpen(false)} />}
                />
              </button>
              <button className="dropdownItem">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
