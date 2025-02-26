import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";

const StyledSubGraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

function SearchNodesByID() {
  return (
    <StyledSubGraph>
      <Heading as="h3">Generate Subgraph</Heading>
      <Input type="text" placeholder="Enter Nodes separated by comma.." />
      <Button size="small" variation="danger">
        View Subgraph
      </Button>
    </StyledSubGraph>
  );
}

export default SearchNodesByID;
