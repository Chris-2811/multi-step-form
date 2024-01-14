import { createContext, useContext, useState } from 'react';

const CompletionContext = createContext();

export const CompletionContextProvider = ({ children }) => {
  const [stepCompletion, setStepCompletion] = useState(false);
  return (
    <CompletionContext.Provider value={{ stepCompletion, setStepCompletion }}>
      {children}
    </CompletionContext.Provider>
  );
};

export default CompletionContext;
