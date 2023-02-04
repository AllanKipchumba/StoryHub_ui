import { useSelector } from "react-redux";

export const ShowOnAuth = ({ children }) => {
  const { user } = useSelector((store) => store["auth"]);
  if (user) {
    return children;
  }
};

export const NoAuth = ({ children }) => {
  const { user } = useSelector((store) => store["auth"]);
  if (!user) {
    return children;
  }
};
