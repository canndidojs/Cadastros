import * as React from 'react';
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { UploadImagePerfil } from './UploadImagePerfil';
import { Box } from '@mui/material';

export const PerfilUsuario: React.FC = () => {

    return (
        <Box>
            <LayoutBaseDePagina
                titulo="Perfil do usuário"
                barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
            >
            </LayoutBaseDePagina>

            <Box>
                <UploadImagePerfil />
            </Box>
        </Box>
    )
}
