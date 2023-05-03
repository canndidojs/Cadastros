import { useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import { Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";


import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";



interface IFormData {
    email: string,
    cidadeId: number,
    nomeCompleto: string,
}



export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');


    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/pessoas')
                    } else {
                        setNome((`Editando ${result.nomeCompleto}`))

                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id])



    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id === 'nova') {
            PessoasService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        navigate(`/pessoas/detalhe/${result}`)
                    }
                });
        } else {
            PessoasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                    }
                });
        }
    }


    const handleDelete = (id: number) => {
        if (confirm('Deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado!')
                        navigate('/pessoas')
                    }
                });
        }
    };


    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoCliclarEmApagar={() => handleDelete(Number(id))}
                    aoCliclarEmVoltar={() => navigate('/pessoas')}
                    aoCliclarEmSalvar={() => formRef.current?.submitForm()}
                    aoCliclarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoCliclarEmSalvarEFechar={() => formRef.current?.submitForm()}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">


                    <Grid container direction="column" padding={2} spacing={2}>

                        {(isLoading &&
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>)}

                        <Grid item>
                            <Typography variant='h6'>Informações gerais</Typography>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label='Nome Completo'
                                    name='nomeCompleto'
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    label='E-mail'
                                    name='email'
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    disabled={isLoading}
                                    placeholder='Cidade'
                                    name='cidadeId'
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Form>

        </LayoutBaseDePagina>
    );
};