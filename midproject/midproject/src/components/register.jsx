import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

export default function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [usertype, setusertype] = useState("user");
  const [city, setcity] = useState("amman");
  const move = useNavigate();
  const { login } = useContext(UserContext);
  const handlesignup = () => {
    if (!fullname || !email || !pass) {
      toast.error("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Email incorrect ");
      return;
    }
    if (pass.length < 8) {
      toast.error("Password is too short! Use at least 8 characters");
      return;
    }
    const userdata = {
      name: fullname,
      type: usertype,
      city: city,
      email: email,
      password: pass,
    };
    const existingUsers = JSON.parse(localStorage.getItem("user")) || [];
    const updatedUsers = [...existingUsers, userdata];
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    login(userdata);
    if (usertype === "agency") {
      move("/AgencyDashboard", { state: { message: " Welcome To Agency " } });
    } else {
      move("/Home", { state: { message: "Welcome To Water & Gaz" } });
    }
  };

  const handleuserclick = () => {
    setusertype("user");
  };
  const handleagencyclick = () => {
    setusertype("agency");
  };

  return (
    <div className="container">
      <div className="register-card">
        <h2>Create Account</h2>

        <div className="inputgroup">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Ex: Mohammad or Ali"
            dir="ltr"
            onChange={(e) => setfullname(e.target.value)}
          />
        </div>
        <div className="inputgroup">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            dir="ltr"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputgroup">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your pass"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div className="inputgroup">
          <label>Account type</label>
          <div className="toogle">
            <button
              type="button"
              className={usertype === "user" ? "active" : ""}
              onClick={handleuserclick}
            >
              User
            </button>
            <button
              type="button"
              className={usertype === "agency" ? "active" : ""}
              onClick={handleagencyclick}
            >
              Agency
            </button>
          </div>
        </div>
        <div className="inputgroup">
          <label> City / Region</label>
          <select
            dir="ltr"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          >
            <option value="amman">Amman</option>
            <option value="irbid">Irbid</option>
            <option value="zarqa">Zarqa</option>
          </select>
        </div>
        <button onClick={handlesignup} className="submit-btn">
          Sign Up
        </button>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#e6ebf1",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}
