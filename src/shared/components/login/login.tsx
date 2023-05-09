import { useState } from "react";
import * as yup from 'yup';
import { Box, Grid, Link, Typography, Button, Divider, createTheme, Avatar, TextField, IconButton, useMediaQuery, CircularProgress } from "@mui/material";
import { useAppThemeContext, useAuthContext } from "../../contexts";
import { Brightness6, LockOutlined } from "@mui/icons-material";
import { blue } from '@mui/material/colors'

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
})

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const theme = createTheme();
    const { toggleTheme } = useAppThemeContext();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    if (isAuthenticated)
        return (
            <>{children}</>
        );

    function Copyright() {
        return (
            <Typography component={Box} variant="body2" display='flex' bottom={2} position='absolute' >
                {''}
                <Link color="inherit" href="    https://github.com/canndidojs">
                    Desenvolvido por Candido
                </Link>{'  /  '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const handleSubmit = () => {
        setIsLoading(true)

        loginSchema
            .validate({ email, password }, { abortEarly: false })
            .then(dadosValidados => {
                login(dadosValidados.email, dadosValidados.password)
                    .then(() => {
                        setIsLoading(false)
                    })
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false)

                errors.inner.forEach(error => {
                    if (error.path === 'email') {
                        setEmailError(error.message);
                    } else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }
                });
            });
    };


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                lg={7}
                sm={false}
                md={false}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
                }}
            />
            <Grid item xs={12} sm={12} lg={5} md={12} display='flex' justifyContent='center' alignItems='center' overflow='hidden'>
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
                    <Typography variant="h5" >
                        Cadastros
                    </Typography>
                    <Box display='flex' width={smDown ? 200 : 400} flexDirection='column' alignItems='center' onSubmit={(e) => { e.preventDefault(); handleSubmit()}} component="form" sx={{ mt: 1 }}>
                        <TextField
                            disabled={isLoading}
                            margin="normal"
                            label="E-mail"
                            type='email'
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            fullWidth
                            onKeyDown={() => setEmailError('')}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            value={password}
                            error={!!passwordError}
                            helperText={passwordError}
                            disabled={isLoading}
                            type="password"
                            label="Senha"
                            fullWidth
                            onKeyDown={() => setPasswordError('')}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                            sx={{
                                mt: 3, mb:
                                    2
                            }}
                        >
                            Entrar
                        </Button>

                        <Divider />

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

                        <Copyright />

                        <Box display='flex'  >
                            <IconButton aria-label="toggleTheme" onClick={toggleTheme} size='large'>
                                <Brightness6 />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
