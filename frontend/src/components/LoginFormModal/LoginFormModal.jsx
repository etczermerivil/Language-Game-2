import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";


function LoginFormModal({ closeMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse); // Handle errors if login fails
    } else {
      closeModal();
      closeMenu(); // Close the dropdown after logging in
      setTimeout(() => {
        navigate("/cards"); // Redirect after modal cleanup
      }, 100);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className="input-group">
          <span className="input-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div className="input-group">
          <span className="input-icon">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
