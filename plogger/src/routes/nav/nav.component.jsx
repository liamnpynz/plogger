import { Outlet, useLocation, Link } from "react-router-dom";

import "./nav.styles.scss";
import PPLSelector from "../../components/ppl-selector/ppl-selector.component";
import { UserAuth } from "../../context/auth.context";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";

const Nav = () => {
  const { user } = UserAuth();
  const currentLocation = useLocation();

  return (
    <>
      <div className="nav-container">
        {currentLocation.pathname === "/" ? (
          <>
            <div className="inner-selections">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                  <b>
                    <span style={{ color: "#38E54D" }}>PPL</span>oggerz
                  </b>
                </div>
              </Link>
              <div className="ppl-selector">
                <PPLSelector />
              </div>
            </div>
          </>
        ) : (
          <div className="inner-selections">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo">
                <b>
                  <span style={{ color: "#38E54D" }}>PPL</span>ogger
                </b>
              </div>
            </Link>
          </div>
        )}
        {user ? (
          <Link
            to="/account"
            style={{ textDecoration: "none", color: "white", marginTop: "4px" }}
          >
            <div className="avatar-container">
              <PersonIcon />
            </div>
          </Link>
        ) : (
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "white", marginTop: "4px" }}
          >
            <div className="avatar-container">
              <PersonOutlineIcon />
            </div>
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
