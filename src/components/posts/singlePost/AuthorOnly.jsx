export const AuthorOnly = ({ children, author, loggedinUser }) => {
  if (author === loggedinUser) {
    return children;
  }
};
