import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthContext } from './hooks/AuthContext'
import useFindUser from './hooks/useFindUser'

import Login from "./pages/Login"
import { Box, Container, CssBaseline, Toolbar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublicRoute from './components/route-control/PublicRoute'
import PrivateRoute from './components/route-control/PrivateRoute'
import Register from './pages/Register'
import Home from './components/Home'
import VerifyToken from './components/2FA/verify-token'
import Settings from './components/settings/Settings'
import ResendTokenForm from './components/2FA/ResendTokenForm'
import EmailVerificationComponent from './components/settings/verify'
import { LanguageProvider } from './hooks/LanguageContext';
import './i18n'; 
import CreateProduct from './components/createProduct';

// APLICACION CLIENTE
export default function App() {
    const { auth, setAuth, loading } = useFindUser();
    const mdTheme = createTheme();

    return (
        <Router>
            <AuthContext.Provider value={{ auth, setAuth, loading }}>
                <LanguageProvider>
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                            }}
                        >
                            <Toolbar />
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <PrivateRoute exact path='/settings' component={Settings}/>
                                    <PrivateRoute exact path='/create' component={CreateProduct}/>
                                    <PrivateRoute exact path='/verifyemail' component={EmailVerificationComponent}/>
                                    <PublicRoute exact path='/login' component={Login} />
                                    <PublicRoute exact path='/register' component={Register} />
                                    <PublicRoute exact path='/verifytoken' component={VerifyToken} />
                                    <PublicRoute exact path='/resendtoken' component={ResendTokenForm}/>
                                </Switch>
                                
                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
                </LanguageProvider>
            </AuthContext.Provider>
        </Router>
    )
}