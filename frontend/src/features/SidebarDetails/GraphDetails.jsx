import Heading from "../../ui/Heading";
import Textarea from "../../ui/Textarea";
import styled from "styled-components";
import { useSelectedNode } from "../../contexts/SelectedNode";

const StyledGraphDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function GraphDetails() {
  const { selectedNode } = useSelectedNode();
  return (
    <StyledGraphDetails>
      <Heading as="h3">SubGraph, Node, Edge details</Heading>
      <Textarea
        disabled={true}
        placeholder="Click on a edge/node/generate a subgraph to view details..."
        value={
          selectedNode ? selectedNode?.uniprotdesc || "No description" : ""
        }
      />
    </StyledGraphDetails>
  );
}

export default GraphDetails;
