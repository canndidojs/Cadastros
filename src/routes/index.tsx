import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>} />
            /** Não cair para tela em branco sem sentido, sempre buscar a página inicial caso for digitado algo diferente na url. */

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}
