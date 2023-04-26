import { Box, Paper, useTheme, Icon, Button, Divider } from '@mui/material'

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalverEFechar?: boolean;

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
    mostrarBotaoSalverEFechar = false,

    aoCliclarEmNovo,
    aoCliclarEmVoltar,
    aoCliclarEmApagar,
    aoCliclarEmSalvar,
    aoCliclarEmSalvarEFechar,

}) => {
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
            {mostrarBotaoSalvar && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={aoCliclarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar</Button>
            )}

            {mostrarBotaoSalverEFechar && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmSalvarEFechar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar e voltar</Button>
            )}

            {mostrarBotaoApagar && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmApagar}
                    startIcon={<Icon>delete</Icon>}
                >
                    Apagar</Button>
            )}

            {mostrarBotaoNovo && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmNovo}
                    startIcon={<Icon>add</Icon>}
                >
                    {textoBotaoNovo}</Button>
            )}

            <Divider
                variant='middle'
                orientation='vertical'
            />

            {mostrarBotaoVoltar && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoCliclarEmVoltar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    Voltar</Button>
            )}
        </Box>
    )
}