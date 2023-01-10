import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/slices/loginSlice";

export const ShowOnAuth = ({ handleClick, className }) => {
  const { user } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user) {
    return (
      <li
        onClick={() => {
          handleClick();
          dispatch(logout());
          navigate("/");
        }}
        className="link"
      >
        logout
      </li>
    );
  } else {
    return (
      <>
        <li onClick={handleClick}>
          <NavLink to="/signup" className={className}>
            sign up
          </NavLink>
        </li>
        <li onClick={handleClick}>
          <NavLink to="/login" className={className}>
            login
          </NavLink>
        </li>
      </>
    );
  }
};
