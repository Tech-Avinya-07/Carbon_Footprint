import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink to="/flight">Flight Book</NavLink>
          </li>
          <li>
            <NavLink to="/electricity">Electricity Bill</NavLink>
          </li>
          <li>
            <NavLink to="/vihical">Vehical Use</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
