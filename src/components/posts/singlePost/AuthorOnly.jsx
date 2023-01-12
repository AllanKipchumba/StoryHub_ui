export const AuthorOnly = ({ children, author }) => {
  if (author) {
    return children;
  }
};
