import { useState } from 'react';
import * as yup from 'yup';
import { Alert, Box, Button, Icon, Link, Modal, TextField, Typography, createTheme, useMediaQuery } from '@mui/material';

const recuperateSchema = yup.object().shape({
    email: yup.string().email().required()
})

export const ModalEsqueceuSenha: React.FC = () => {

    const [openModalSenha, setOpenModalSenha] = useState(false);
    const handleCloseModalSenha = () => setOpenModalSenha(false);
    const handleOpenModalSenha = () => setOpenModalSenha(true);

    const [openModalCriar, setOpenModalCriar] = useState(false);
    const handleCloseModalCriar = () => setOpenModalCriar(false);
    const handleOpenModalCriar = () => setOpenModalCriar(true);

    const theme = createTheme();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [emailError, setEmailError] = useState('');

    const [email, setEmail] = useState('');


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 20,
        p: 4,
    };

    const [alert, setAlert] = useState<{ severity: "success" | "error", message: string } | null>(null);

    const handleSubmit = () => {
        recuperateSchema
            .validate({ email })
            .then(() => {
                setEmailError('');
                setAlert({ severity: "success", message: "E-mail enviado para recuperação de senha." });
            })
            .catch((error: yup.ValidationError) => {
                if (error.path === 'email') {
                    setAlert({ severity: "error", message: error.message });
                }
            });
    };

    return (
        <Box>
            <Box display='flex' p={0} gap={8}>
                <Link onClick={handleOpenModalSenha} href="#" variant="body2">
                    Esqueceu sua senha?
                </Link>

                <Link onClick={handleOpenModalCriar} href="#" variant="body2">
                    {"Ainda não tem conta? Crie uma"}
                </Link>
            </Box>
            <Button onClick={handleOpenModalSenha}></Button>
            <Modal
                open={openModalSenha}
                onClose={handleCloseModalSenha}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Button onClick={handleCloseModalSenha} sx={{ p: 0.5, position: 'absolute', left: '93.5%' }} ><Icon>close</Icon></Button> */}
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width={smDown ? 300 : 500} height={500} sx={{ ...style, bgcolor: 'background.paper', p: 2 }} >
                    <Typography id="modal-modal-title" variant="h6" sx={{ mt: 2 }} >
                        Recuperar senha
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                        Informe seu e-mail para recuperação de senha.
                    </Typography>

                    <form>
                        <Box display='flex' flexDirection='column' width={smDown ? 250 : 350}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="E-mail"
                                type='email'
                                value={email}
                                helperText={emailError}
                                onKeyDown={() => setEmailError('')}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {alert && (
                                <Alert sx={{ margin: 2 }} severity={alert.severity}>{alert.message}</Alert>
                            )}
                            <Button onClick={handleSubmit} variant="contained">Enviar</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>

            <Box>
                <Modal
                    open={openModalCriar}
                    onClose={handleCloseModalCriar}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box display='flex' flexDirection='column' alignItems='center' width={smDown ? 300 : 500} height={500} sx={{ ...style, bgcolor: 'background.paper', p: 2 }} >
                        <Typography id="modal-modal-title" variant="h4" sx={{ mt: 2 }} >
                            Criar conta
                        </Typography>
                        <TextField
                            margin='normal'
                            label='Nome completo'
                            type='nome'
                            value={name}
                            required
                        >
                        </TextField>

                        <TextField
                            margin='normal'
                            label='E-mail'
                            type='email'
                            value={email}
                            required
                        >
                        </TextField>

                        <TextField
                            margin='normal'
                            label='Senha'
                            type='password'
                            // value={password}
                            required
                        >
                        </TextField>


                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}