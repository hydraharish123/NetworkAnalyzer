import { createContext, useState, useContext, useRef } from "react";

const layoutContext = createContext();

export const useLayoutContext = () => useContext(layoutContext);

function LayoutProvider({ children }) {
  const cyRef = useRef(null);
  const [curlayout, setcurLayout] = useState("grid");

  return (
    <layoutContext.Provider
      value={{
        curlayout,
        setcurLayout,
        cyRef,
      }}
    >
      {children}
    </layoutContext.Provider>
  );
}

export default LayoutProvider;
