import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { Box, AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';


function Home (){
  const {user , logout}=useContext(UserContext)
  const move=useNavigate()
  const location=useLocation()
  const msg=location.state?.message
  
  const handleLogout=()=>{
    logout()
    move("/")
  }
  return (
    <>
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh', direction: 'ltr' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{justifyContent:"space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Typography variant="h6" sx={{fontWeight:"bold", color:'#1976d2'}}>
          Water & Gaz
        </Typography>
         <Typography variant="body2" sx={{color:"#666"}}>
          Welcome , {user?.name}
        </Typography>
        </Box>
        
        <Button onClick={handleLogout} variant="outlined" color="error" size="small">
          Log out
        </Button>

       
      </Toolbar>

      </AppBar>
      <Container sx={{ mt: 5 }}>
        {msg && (
          <Box sx={{ backgroundColor: "#e3f2fd", p: 2, borderRadius: 2, mb: 4, textAlign: 'center' }}>
            <Typography color="#1976d2">{msg}</Typography>
          </Box>
        )}

        <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Our Services</Typography>

        <Grid container spacing={4}>
          <Grid  xs={12} sm={6}>
            <Card sx={{ borderRadius: 4, textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>🛢️</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Gas Delivery</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Order your gas cylinder and get it delivered in minutes.
                </Typography>
                <Button variant="contained" fullWidth>Order Now</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid  xs={12} sm={6}>
            <Card sx={{ borderRadius: 4, textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>💧</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Water Service</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Pure drinking water gallons for your home or office.
                </Typography>
                <Button variant="contained" fullWidth>Order Now</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    
    
    </>
  )

}
export default Home