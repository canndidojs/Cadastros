import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PessoasService, IListagemPessoa } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { Alert, Snackbar } from '@mui/material'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, LinearProgress, Pagination, IconButton, Icon } from "@mui/material";

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [showAlertDelete, setShowAlertDelete] = useState(false);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams])

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        console.log(result)

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    }
                });
        });
    }, [busca, pagina])

    const handleDelete = (id: number) => {

        if (confirm('Deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => {
                            return [
                                ...oldRows.filter(oldRow => oldRow.id !== id)
                            ]
                        });
                        setShowAlertDelete(true);
                    }
                });
        }

    }

    return (
        <LayoutBaseDePagina
            titulo='Listagem de pessoas'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo='Nova'
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell width={200}>Nome completo</TableCell>
                            <TableCell>E-mail</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>

                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} sx={{ p: 0 }}>

                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}

                        {(totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3} sx={{ p: 0 }}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(e, newPage) => setSearchParams({ pagina: newPage.toString(), busca })}


                                        shape="rounded"
                                        sx={{ p: 1 }}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

            {showAlertDelete && (
                <Snackbar open={showAlertDelete} autoHideDuration={5000} onClose={() => setShowAlertDelete(false)}>
                    <Alert onClose={() => setShowAlertDelete(false)} severity="success" sx={{ width: '100%' }}>
                        Registro apagado com sucesso!
                    </Alert>
                </Snackbar>
            )}
        </LayoutBaseDePagina >
    );
};