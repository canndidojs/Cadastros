import { useEffect, useState } from 'react';
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () => {

    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        CidadesService.getAll(1)
            .then((result) => {
                setIsLoadingCidades(false);

                if (result instanceof Error) {
                    alert(result.message)
                } else {
                    console.log(result)

                    setTotalCountCidades(result.totalCount);
                }
            });

            PessoasService.getAll()
            .then((result) => {
                setIsLoadingPessoas(false);

                if (result instanceof Error) {
                    alert(result.message)
                } else {
                    console.log(result)

                    setTotalCountPessoas(result.totalCount);
                }
            });
    }, []);


    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
        >
            <Box width='100%' display='flex'>
                <Grid container m={1}>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de cidades
                                    </Typography>

                                    <Box p={6} display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingCidades && (
                                        <Typography variant='h2'>
                                            {totalCountCidades}
                                        </Typography>)}


                                        { isLoadingCidades && (
                                         <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de pessoas
                                    </Typography>

                                    <Box p={6} display='flex' justifyContent='center' alignItems='center'>
                                    {!isLoadingPessoas && (
                                        <Typography variant='h2'>
                                            {totalCountPessoas}
                                        </Typography>)}


                                        { isLoadingPessoas && (
                                         <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};