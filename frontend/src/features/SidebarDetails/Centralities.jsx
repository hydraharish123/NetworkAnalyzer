import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import styled, { keyframes } from "styled-components";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

const StyledCentrality = styled.div`
  text-align: center;
`;

const CentralityList = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

function Centralities() {
  const [centrality, setCentrality] = useState(null);
  const [isLoadingCentrality, setIsLoadingCentrality] = useState(false);
  const [selectedCentrality, setSelectedCentrality] = useState(null);

  useEffect(function () {
    async function fetchCentrality() {
      try {
        setIsLoadingCentrality(true);
        const res = await fetch("http://localhost:5000/get-centralitites");
        if (!res.ok) throw new Error("Error in fetching Centralities");
        const data = await res.json();
        setCentrality(data); // object of centralities
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoadingCentrality(false);
      }
    }

    fetchCentrality();
  }, []);

  if (isLoadingCentrality) return <Spinner />;

  return (
    <StyledCentrality>
      <Heading as="h3">Centrality Measures</Heading>

      <CentralityList>
        {!isLoadingCentrality
          ? Object.entries(centrality).map(([key, value], ind) => (
              <Button key={ind} size="small">
                {key}
              </Button>
            ))
          : null}
      </CentralityList>
    </StyledCentrality>
  );
}

export default Centralities;
