import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <div>
        <h2>404</h2>
        <h4>Page not Found</h4>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
