import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import { useState } from "react";
import { useLayoutContext } from "../../contexts/LayoutsContext";

import { toast } from "react-hot-toast";

const StyledSubGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

function SearchNodesByID() {
  const [queryNodes, setQueryNodes] = useState(""); // User input for node IDs
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const { cyRef } = useLayoutContext();
  const [isSubGraph, setIsSubgraph] = useState(false);

  const extractSubgraph = () => {
    if (!cyRef.current || !cyRef.current.cy) return;

    const cy = cyRef.current.cy;

    const inputNodeIds = queryNodes
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== ""); // Remove empty strings

    if (inputNodeIds.length === 0) {
      setErrorMessage("⚠️ Please enter at least one node ID.");
      toast.error("⚠️ Please enter at least one node ID.");
      return;
    }

    let selectedNodes = cy
      .nodes()
      .filter((node) => inputNodeIds.includes(node.id()));

    if (selectedNodes.length === 0) {
      setErrorMessage("⚠️ No matching nodes found in the network.");
      toast.error("⚠️ No matching nodes found in the network.");
      return;
    }

    let subgraphNodes = selectedNodes.union(
      selectedNodes.neighborhood().nodes()
    );
    let subgraphEdges = subgraphNodes.connectedEdges();

    if (subgraphNodes.length === 0) {
      setErrorMessage("⚠️ No neighbors found for the selected nodes.");
      toast.error("⚠️ No neighbors found for the selected nodes.");
      return;
    }

    console.log(
      "Selected Nodes:",
      selectedNodes.map((n) => n.id())
    );
    console.log(
      "Subgraph Nodes:",
      subgraphNodes.map((n) => n.id())
    );
    console.log("Subgraph Edges:", subgraphEdges.length);

    // Hide everything else instead of removing
    cy.elements().style("display", "none");
    subgraphNodes.style("display", "element");
    subgraphEdges.style("display", "element");

    // Apply layout and refresh
    cy.layout({ name: "grid" }).run();
    cy.resize();
    cy.fit(); // Ensures everything fits inside view
    setIsSubgraph(true);
    setErrorMessage(""); // Clear error message
    setQueryNodes("");
  };

  const resetGraph = () => {
    if (!cyRef.current || !cyRef.current.cy) return;

    const cy = cyRef.current.cy;

    // Show all elements again
    cy.elements().style("display", "element");

    // Apply original layout
    cy.layout({ name: "grid" }).run();

    // Reset zoom and pan
    cy.fit();
    cy.center();

    console.log("Graph reset to original state.");
    setIsSubgraph(false);
    setQueryNodes("");
  };

  return (
    <StyledSubGraph>
      <Heading as="h3">Generate Subgraph</Heading>
      <Input
        type="text"
        placeholder="Enter Nodes separated by comma.."
        onChange={(e) => setQueryNodes(e.target.value)}
        value={queryNodes}
      />
      <ButtonContainer>
        <Button size="small" variation="primary" onClick={extractSubgraph}>
          View Subgraph
        </Button>
        {isSubGraph && (
          <Button size="small" variation="danger" onClick={resetGraph}>
            Reset
          </Button>
        )}
      </ButtonContainer>
    </StyledSubGraph>
  );
}

export default SearchNodesByID;
