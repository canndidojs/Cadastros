import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  ListagemDePessoas

} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();


  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'groups',
        path: '/pessoas',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
            /** Não cair para tela em branco sem sentido, sempre buscar a página inicial caso for digitado algo diferente na url. */

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      {/*<Route path="/pessoas/detalhe/:id" element={<Dashboard />} />*/}

      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
