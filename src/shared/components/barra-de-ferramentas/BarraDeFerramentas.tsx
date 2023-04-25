import { Box, Button, TextField, Paper, useTheme, Icon, InputAdornment, } from "@mui/material";


export const BarraDeFerramentas: React.FC = () => {
    const theme = useTheme();


    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >


            <TextField
                size="small"
                placeholder='Pesquisar...'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon>search</Icon>
                        </InputAdornment>
                    )
                }}
            />

            <Box flex={1} display="flex" justifyContent="end">
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    endIcon={<Icon>add</Icon>}
                >Novo</Button>
            </Box>
        </Box>
    );
};
