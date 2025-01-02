import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Função para capturar arquivos e formatar as rotas
function generateRoutes() {
  // Captura explicitamente o arquivo index.tsx da pasta raiz
  const rootPage = import.meta.glob('../app/index.tsx', { eager: true });
  
  // Captura todos os arquivos index.tsx dentro das subpastas
  const subPages = import.meta.glob('../app/**/index.tsx');
  
  const routes = [];

  // Adiciona a rota raiz
  if (rootPage['../app/index.tsx']) {
    routes.push({
      path: '/',
      component: lazy(() => import('../app/index.tsx')), // Lazy load para a rota raiz
    });
  }

  // Adiciona as rotas das subpastas
  Object.keys(subPages).forEach((path) => {
    const routePath = path
      .replace('../app/', '') // Remove o prefixo
      .replace('/index.tsx', '') // Remove "/index.tsx"
      .toLowerCase(); // Normaliza para letras minúsculas

    routes.push({
      path: routePath === '' ? '/' : `/${routePath}`, // Define o caminho da rota
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: lazy(subPages[path] as any), // Lazy load do componente
    });
  });

  return routes;
}

const AppRoutes = () => {
  const routes = generateRoutes();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
