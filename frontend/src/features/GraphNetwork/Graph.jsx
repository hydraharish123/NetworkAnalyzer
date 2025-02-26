import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import CytoscapeLayout from "./CytoscapeLayout";
function Graph() {
  const [elements, setElements] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        setErrorMsg("");
        setIsLoadingGraph(true);
        const res = await fetch("http://localhost:5000/fetchCytoscape");
        if (!res.ok) throw new Error("Data could not be parsed");
        const data = await res.json();

        console.log(data.converted_data.elements);

        setElements(data.converted_data.elements);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoadingGraph(false);
      }
    }

    fetchData();
  }, []);

  if (isLoadingGraph) return <Spinner />;
  return (
    <div>
      <CytoscapeLayout elements={elements} />
    </div>
  );
}

export default Graph;
