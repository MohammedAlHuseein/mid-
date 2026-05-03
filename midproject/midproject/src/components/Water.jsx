import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
function Water() {
  const products = [
    { id: 1, name: "Large Water Gallon", price: 2, image: "💧" },
    { id: 2, name: "Water Cups Carton", price: 3, image: "🥛" },
    { id: 3, name: "Water Bottles Carton", price: 5, image: "📦" },
  ];
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };
  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };
  const { user } = useContext(UserContext);
  const handleAddToOrder = (product) => {
    const newOrder = {
      id: Date.now(),
      userName: user?.name || "Guest",
      service: product.name,
      status: "Pending",
      date: new Date().toLocaleDateString(),
      qty: quantities[product.id],
      total: product.price * quantities[product.id],
      type: "Water",
    };

    const existingOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];

    localStorage.setItem("all_orders", JSON.stringify(updatedOrders));

    toast.success(`${newOrder.qty} ${newOrder.service} Added to Order!`);
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          Water Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Card sx={{ borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {item.image}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
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
                    <IconButton
                      onClick={() => handleDecrement(item.id)}
                      size="small"
                      sx={{ border: "1px solid #ccc" }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography variant="h6">{quantities[item.id]}</Typography>

                    <IconButton
                      onClick={() => handleIncrement(item.id)}
                      size="small"
                      sx={{ border: "1px solid #ccc" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => handleAddToOrder(item)}
                  >
                    Add to Order
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
export default Water;
