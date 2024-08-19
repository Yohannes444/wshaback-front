import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';

const RegisterGame = () => {
    const [gameData, setGameData] = useState({
        gameId: '',
        gameType: 'tryfecta'  // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert gameId to number if the name is "gameId"
        setGameData({
            ...gameData,
            [name]: name === 'gameId' ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameid`, gameData);
            console.log('Data registered successfully:', response.data);
        } catch (error) {
            console.error('Error registering data:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Register Game Data
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Game ID"
                    variant="outlined"
                    name="gameId"
                    type="number"  // Ensures only numeric input
                    value={gameData.gameId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                >
                    Register Game
                </Button>
            </form>
        </Container>
    );
};

export default RegisterGame;
