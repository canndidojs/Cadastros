import { Routes, Route, Navigate } from 'react-router-dom'

export const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/pagina-inicial" element={<p>Página inicial</p>} />
            /** Não cair para tela em branco sem sentido, sempre buscar a página inicial caso for digitado algo diferente na url. */

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}