import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Box, Typography, CssBaseline, AppBar, Toolbar, Button, Grid, Card, 
    CardContent, TableContainer, Paper, Table, TableHead, TableRow, 
    TableCell, TableBody, TextField 
} from "@mui/material";
import { UserContext } from "../Context/UserContext";

function AgencyDashboard() {
    const { user, logout } = useContext(UserContext);
    const move = useNavigate();
    const [agencies, setagencies] = useState([]);
    const [editEmail, setEditEmail] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', type: '', city: '' });

    useEffect(() => {
        const staredData = JSON.parse(localStorage.getItem('all_agency')) || [];
        setagencies(staredData);
    }, []);
    const totalAgency=agencies.length
    const totalUsers = (JSON.parse(localStorage.getItem('all_users')) || []).length;

    const hanleLogout = () => {
        logout();
        move("/");
    };

    const handleDelete = (email) => {
        const updated = agencies.filter(a => a.email !== email);
        setagencies(updated);
        localStorage.setItem('all_agency', JSON.stringify(updated));
    };

    const startEdit = (agency) => {
        setEditEmail(agency.email);
        setEditFormData({ ...agency });
    };

    const handleSaveEdit = () => {
        const updated = agencies.map(a => a.email === editEmail ? editFormData : a);
        setagencies(updated);
        localStorage.setItem('all_agency', JSON.stringify(updated));
        setEditEmail(null);
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "rgb(12, 12, 12)" }} >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Agency : {user?.name || "Guest"}
                        </Typography>
                        <Button color="inherit" onClick={hanleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Agency Dashboard</Typography>
                    
                   <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid  xs={12} sm={6}>
        <Card sx={{ backgroundColor: "rgb(205, 49, 153)", boxShadow: 3 }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Agencies</Typography>
                <Typography variant="h6"> {totalAgency} </Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid  xs={12} sm={6}>
        <Card sx={{ backgroundColor: "rgb(205, 49, 153)", boxShadow: 3 }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Users</Typography>
                <Typography variant="h6"> {totalUsers} </Typography> 
            </CardContent>
        </Card>
    </Grid>
</Grid>

                    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "rgb(15, 17, 16)" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}><strong>Agency Name</strong></TableCell>
                                    <TableCell sx={{ color: "white" }}><strong>Business Type</strong></TableCell>
                                    <TableCell sx={{ color: "white" }}><strong>City</strong></TableCell>
                                    <TableCell sx={{ color: "white" }}><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agencies.map((agency, index) => (
                                    <TableRow key={index}>
                                        {editEmail === agency.email ? (
                                            <>
                                                <TableCell>
                                                    <TextField size="small" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField size="small" value={editFormData.type} onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })} />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField size="small" value={editFormData.city} onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })} />
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={handleSaveEdit} color="success">Save</Button>
                                                    <Button onClick={() => setEditEmail(null)} color="error">Cancel</Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{agency.name}</TableCell>
                                                <TableCell>{agency.type}</TableCell>
                                                <TableCell>{agency.city}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <Button variant="contained" color="primary" size="small" onClick={() => startEdit(agency)}>Edit</Button>
                                                        <Button variant="contained" color="error" size="small" onClick={() => handleDelete(agency.email)}>Delete</Button>
                                                    </Box>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
}

export default AgencyDashboard;