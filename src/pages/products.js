import { useEffect } from 'react';
import { usePageContent } from '@/context/PageContentContext';

export default function Products() {
  const { setPageContent } = usePageContent();

  useEffect(() => {
    setPageContent('Aquí están nuestros productos. Explora nuestra variedad de artículos.');
  }, [setPageContent]);

  return (
    <div>
      <h1>Productos</h1>
      <p>Contenido estático aquí.</p>
    </div>
  );
}
