import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-title">
                <span className="logo-accent">IoT</span> MONITOR
            </div>

            <div className="navbar-items">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/rawdata"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Raw Data
                </NavLink>

                <NavLink
                    to="/alerts"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Alerts
                </NavLink>
            </div>
        </div>
    );
}