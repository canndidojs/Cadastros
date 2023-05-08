import { Box, Grid, Link, Typography, Button, ThemeProvider, CssBaseline, createTheme, Paper, Avatar, TextField as VTextField, List, Icon, ListItemButton, ListItemIcon, ListItemText, FormControlLabel, Checkbox } from "@mui/material";
import { blue } from '@mui/material/colors'
import { useAppThemeContext, useAuthContext } from "../../contexts";
import { LockOutlined } from "@mui/icons-material";

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    const { toggleTheme } = useAppThemeContext();

    if (isAuthenticated) {
        return (
            <>{children}</>
        );
    }

    function Copyright() {
        return (
            <Typography component={Box} variant="body2" color="text.secondary" display='flex' bottom={2} position='absolute' >
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/canndidojs ">
                    Desenvolvido por Candido
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const theme = createTheme();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme} >
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square display='flex' justifyContent='center' alignItems='center' >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: blue[800] }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Cadastros
                        </Typography>
                        <Box display='flex' width={400} flexDirection='column' alignItems='center' component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <VTextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <VTextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb:
                                        2
                                }}
                            >
                                Entrar
                            </Button>
                            <Grid container display='flex' flexDirection='column' alignItems='center' >
                                <Grid item xs justifyContent='center'>
                                    <Link href="#" variant="body2">
                                        Esqueceu sua senha?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Ainda não tem conta? Crie uma"}
                                    </Link>
                                </Grid>
                            </Grid>

                            <Box flex={1}>
                                <List component="nav">
                                    <ListItemButton onClick={toggleTheme}>
                                        <ListItemIcon>
                                            <Icon>dark_mode</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Alternar tema" />
                                    </ListItemButton>
                                </List>
                            </Box>
                            <Copyright />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
