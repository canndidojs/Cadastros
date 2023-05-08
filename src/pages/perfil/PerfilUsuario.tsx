import * as React from 'react';
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

import { MobileStepper, Button, useTheme } from '@mui/material';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export const PerfilUsuario: React.FC = () => {


    return (
        <LayoutBaseDePagina
            titulo="Perfil do usuário"
            barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
        >
           
        </LayoutBaseDePagina>
    )
}
