import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { toast } from 'react-toastify';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingMessages = JSON.parse(localStorage.getItem('user_messages')) || [];
        const newMessages = [...existingMessages, { ...formData, id: Date.now() }];
        localStorage.setItem('user_messages', JSON.stringify(newMessages));
        setFormData({ name: '', email: '', message: '' });
        toast.success("Message Sent to Admin!", { position: "bottom-right" });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Your Name"
                        variant="outlined"
                        margin="normal"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        size="large" 
                        sx={{ mt: 3, backgroundColor: '#1976d2' }}
                    >
                        Send Message
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default Contact;