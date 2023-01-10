import { useSelector } from "react-redux";
import { Login, Home } from "../../pages";

export const Authenticated = ({ children }) => {
  const { user } = useSelector((store) => store["logIn"]);

  if (user) {
    return children;
  } else {
    return <Login />;
  }
};

export const NotAuthenticated = ({ children }) => {
  const { user } = useSelector((store) => store["logIn"]);
  if (!user) {
    return children;
  } else {
    return <Home />;
  }
};
