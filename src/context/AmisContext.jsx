import { createContext, useContext, useState, useCallback } from 'react';
import { TAIL_NUMBERS } from '../data/mockData';

const AmisContext = createContext(null);

export function AmisProvider({ children }) {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedTail, setSelectedTail] = useState(TAIL_NUMBERS[0]);
  const [selectedPartSn, setSelectedPartSn] = useState('ENG-7A-44021');
  const [ariaOpen, setAriaOpen] = useState(false);
  const [ariaPersona, setAriaPersona] = useState('expert');
  const [ariaMessages, setAriaMessages] = useState([
    { role: 'aria', text: 'ARIA online. Fleet context loaded. How can I assist?', rating: null },
  ]);

  const openAria = useCallback(() => setAriaOpen(true), []);
  const closeAria = useCallback(() => setAriaOpen(false), []);
  const toggleAria = useCallback(() => setAriaOpen((o) => !o), []);

  const sendAriaMessage = useCallback((text, response) => {
    setAriaMessages((prev) => [
      ...prev,
      { role: 'user', text, rating: null },
      { role: 'aria', text: response, rating: null },
    ]);
  }, []);

  const rateMessage = useCallback((index, rating) => {
    setAriaMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, rating } : m))
    );
  }, []);

  return (
    <AmisContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedTail,
        setSelectedTail,
        selectedPartSn,
        setSelectedPartSn,
        ariaOpen,
        openAria,
        closeAria,
        toggleAria,
        ariaPersona,
        setAriaPersona,
        ariaMessages,
        sendAriaMessage,
        rateMessage,
      }}
    >
      {children}
    </AmisContext.Provider>
  );
}

export function useAmis() {
  const ctx = useContext(AmisContext);
  if (!ctx) throw new Error('useAmis must be used within AmisProvider');
  return ctx;
}
