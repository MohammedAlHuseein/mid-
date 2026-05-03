import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";

function Gaz() {
  const { user } = useContext(UserContext);

  const gasProducts = [
    { id: 1, name: "new gaz cylinder", price: 45, image: "🆕" },
    { id: 2, name: "Refill Gas Cylinder", price: 7, image: "🔥" },
    { id: 3, name: "Gas Regulator", price: 5, image: "🔧" },
  ];
  const [quantities, setQuantities] = useState({});
  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };
  const handleOrder = (serviceType) => {
    const orders = JSON.parse(localStorage.getItem("all_orders")) || [];
    const newOrder = {
      id: Date.now(),
      userName: user?.name,
      service: serviceType,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("all_orders", JSON.stringify([...orders, newOrder]));
    toast.success(`${serviceType} Order Placed!`);
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            color: "#e64a19",
          }}
        >
          Gaz Services
        </Typography>
        <Grid container spacing={3}>
          {gasProducts.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Card sx={{ borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {" "}
                    {item.image}{" "}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {" "}
                    {item.name}{" "}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {" "}
                    Price: {item.price} JOD
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </Button>

                    <Typography sx={{ fontWeight: "bold" }}>
                      {quantities[item.id] || 0}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleOrder(item.name)}
                    sx={{
                      backgroundColor: "#e64a19",
                      "&:hover": { backgroundColor: "#bf360c" },
                    }}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
export default Gaz;
