import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
    const {toggleTheme} = useAppThemeContext();

    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleTheme}>Trocar tema</Button>} />
            /** Não cair para tela em branco sem sentido, sempre buscar a página inicial caso for digitado algo diferente na url. */

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}
