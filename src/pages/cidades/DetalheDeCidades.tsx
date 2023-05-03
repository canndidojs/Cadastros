import { useEffect, useState } from "react";
import { Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';


import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData {
    nome: string;
}

const formValidation: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
});


export const DetalheDeCidades: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');


    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/cidade')
                    } else {
                        setNome((`Editando ${result.nome}`))

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: '',
            });
        }
    }, [id])


    const handleSave = (dados: IFormData) => {

        formValidation.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);

                if (id === 'nova') {
                    CidadesService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message)
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    CidadesService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                }
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            });
    };


    const handleDelete = (id: number) => {
        if (confirm('Deseja apagar?')) {
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado!')
                        navigate('/cidades')
                    }
                });
        }
    };


    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova cidade' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoCliclarEmSalvar={save}
                    aoCliclarEmSalvarEFechar={saveAndClose}
                    aoCliclarEmVoltar={() => navigate('/cidades')}
                    aoCliclarEmApagar={() => handleDelete(Number(id))}
                    aoCliclarEmNovo={() => navigate('/cidades/detalhe/nova')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave}>
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
                                    label='Cidade'
                                    name='nome'
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>


        </LayoutBaseDePagina>
    );
};