import { useEffect } from 'react';
import { usePageContent } from '@/context/PageContentContext';

export default function Home() {
  const { setPageContent } = usePageContent();

  useEffect(() => {
    setPageContent('Bienvenido a la página de inicio. Aquí puedes encontrar la información más reciente.');
  }, [setPageContent]);

  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Contenido estático aquí.</p>
    </div>
  );
}
