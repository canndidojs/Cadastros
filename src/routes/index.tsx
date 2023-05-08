import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  ListagemDePessoas,
  DetalheDePessoas,
  DetalheDeCidades,
  ListagemDeCidades,
  PerfilUsuario
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
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades',
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

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

      
      <Route path="/cidades" element={<ListagemDeCidades/>} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

      <Route path="/perfil" element={<PerfilUsuario/>} />
      
      <Route path="/perfil" element={<PerfilUsuario/>} />
      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};