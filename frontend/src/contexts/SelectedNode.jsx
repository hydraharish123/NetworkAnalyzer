// SelectedNodeContext.jsx
import { createContext, useState, useContext } from "react";

const SelectedNodeContext = createContext();

export const useSelectedNode = () => useContext(SelectedNodeContext);

export const SelectedNodeProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {children}
    </SelectedNodeContext.Provider>
  );
};
