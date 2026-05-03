import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Container, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const move = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = () => {
    if (Email === "" || Password === "") {
      toast.error("Please enter both email and pass");
    } else {
      const usersArray = JSON.parse(localStorage.getItem("user")) || [];
      const staredUser = usersArray.find(
        (u) =>
          u.email.toLowerCase() === Email.toLowerCase() &&
          u.password === Password,
      );
      if (staredUser) {
        login(staredUser);
        toast.success("login successful!");

        if (staredUser.type === "agency") {
          move("/AgencyDashboard");
        } else {
          move("/Home");
        }
      } else {
        toast.error("invalid email or password");
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Login
        </Typography>

        <TextField
          label="Email Adress"
          variant="outlined"
          fullWidth
          margin="normal"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Sign Up{" "}
          </Link>
        </Typography>
      </Container>
    </>
  );
}
export default Login;
