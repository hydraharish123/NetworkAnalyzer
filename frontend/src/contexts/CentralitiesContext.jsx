import { useEffect, useState, createContext } from "react";

export const centralitiesContext = createContext();

export const CentralitiesProvider = ({ children }) => {
  const [centralities, setCentralities] = useState(
    JSON.parse(localStorage.getItem("centralities")) || null
  );
  const [loadingCentrality, setLoadingCentrality] = useState(false);
  const [elements, setElements] = useState(
    JSON.parse(localStorage.getItem("elements")) || null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [fileUploading, setFileUploading] = useState(
    JSON.parse(localStorage.getItem("fileUploading")) ?? true
  );

  useEffect(() => {
    async function fetchCentrality() {
      try {
        console.log("fetching");
        setErrorMsg("");
        setLoadingCentrality(true);
        const res = await fetch("http://localhost:5000/fetchCytoscape");
        if (!res.ok) throw new Error("Data could not be parsed");
        const data = await res.json();
        console.log(data);

        setElements(data.converted_data.elements);
        localStorage.setItem(
          "elements",
          JSON.stringify(data.converted_data.elements)
        );
        delete data.converted_data;
        delete data.message;

        setCentralities(data);

        // 🔥 Save to localStorage
        localStorage.setItem("centralities", JSON.stringify(data));

        console.log(elements, centralities);
      } catch (err) {
        console.error(err.message);
        setErrorMsg(err.message);
      } finally {
        setLoadingCentrality(false);
      }
    }

    if (fileUploading) return;
    fetchCentrality();
  }, [fileUploading]);

  // 🔥 Persist `fileUploading` state when it changes
  useEffect(() => {
    localStorage.setItem("fileUploading", JSON.stringify(fileUploading));
  }, [fileUploading]);

  return (
    <centralitiesContext.Provider
      value={{
        centralities,
        setCentralities,
        loadingCentrality,
        setLoadingCentrality,
        elements,
        setElements,
        errorMsg,
        setErrorMsg,
        setFileUploading,
      }}
    >
      {children}
    </centralitiesContext.Provider>
  );
};
