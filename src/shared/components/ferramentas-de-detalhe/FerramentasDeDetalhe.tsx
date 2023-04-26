import { Box, Paper, useTheme, Icon, Button, Divider, Skeleton, Typography, useMediaQuery, Theme, ButtonGroup } from '@mui/material'

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;


    aoCliclarEmNovo?: () => void;
    aoCliclarEmVoltar?: () => void;
    aoCliclarEmApagar?: () => void;
    aoCliclarEmSalvar?: () => void;
    aoCliclarEmSalvarEFechar?: () => void;
}


export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoCliclarEmNovo,
    aoCliclarEmVoltar,
    aoCliclarEmApagar,
    aoCliclarEmSalvar,
    aoCliclarEmSalvarEFechar,

}) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const theme = useTheme();

    return (
        <Box gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={aoCliclarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography variant='button' noWrap>
                        Salvar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton
                    width={110}
                    height={60}
                />
            )}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmSalvarEFechar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography variant='button' noWrap>
                        Salvar e voltar
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Skeleton
                    width={180}
                    height={60}
                />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmApagar}
                    startIcon={<Icon>delete</Icon>}
                >
                    <Typography variant='button' noWrap>
                        Apagar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoApagarCarregando && (
                <Skeleton
                    width={110}
                    height={60}
                />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmNovo}
                    startIcon={<Icon>add</Icon>}
                >
                    <Typography variant='button' noWrap>
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}


            {(mostrarBotaoNovoCarregando && !smDown) && (
                <Skeleton
                    width={110}
                    height={60}
                />
            )}

            {
                (
                    mostrarBotaoVoltar &&
                    (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
                ) && (
                    <Divider
                        variant='middle'
                        orientation='vertical'
                    />
                )
            }

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmVoltar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    <Typography variant='button' noWrap>
                        Voltar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton
                    width={110}
                    height={60}
                />
            )}
        </Box>
    )
}