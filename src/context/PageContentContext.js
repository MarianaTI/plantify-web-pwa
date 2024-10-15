import React, { createContext, useContext, useState } from 'react';

const PageContentContext = createContext();

export const PageContentProvider = ({ children }) => {
  const [pageContent, setPageContent] = useState('');

  return (
    <PageContentContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => useContext(PageContentContext);
