import { Paper, TextField, Button } from '@mui/material'
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { LOGIN_MSG } from "../utils/messages";
import { BASE_URL } from '../utils/api';
import { validateEmail } from '../utils/validation';
import { setAuth } from "../redux/slices/authSlice";

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
  if (!validateEmail(email)) {
    setMsg(LOGIN_MSG.INVALID_EMAIL);
    return;
  }

  try {
    const res = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    const user = res.data;

    dispatch(
      setAuth({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          permissions: {
            studentManagement: user.studentManagement,
            staffManagement: user.staffManagement,
            priceManagement: user.priceManagement,
            leadManagement: user.leadManagement,
            generateCertificate: user.generateCertificate,
          },
        },
        token: user.token, // use real token from backend
      })
    );

    setMsg(LOGIN_MSG.SUCCESS);
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    setMsg(LOGIN_MSG.INVALID_CREDENTIALS);
    setPassword("");
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(700deg, #f1f1f1f1,white)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: `'Segoe UI', sans-serif`,
      }}
    >
      <Paper elevation={3} sx={{
        padding: '40px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <TextField
          id="Email-input"
          label="E-Mail"
          type="email"
          variant="outlined"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="password-input"
          label="Password"
          type="password"
          variant="outlined"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot-password">Forgot Password?</Link>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={!email || !password}
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        {msg && (
          <p style={{ color: msg.includes("Successful") ? "green" : "red" }}>
            {msg}
          </p>
        )}

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <span>New to App? </span>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
