import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página Inicial',
                path: '/pagina-inicial',
                icon: 'home',
            },
        ]);
    });

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>} />
            /** Não cair para tela em branco sem sentido, sempre buscar a página inicial caso for digitado algo diferente na url. */

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}
