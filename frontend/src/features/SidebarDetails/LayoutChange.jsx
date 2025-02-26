import Button from "../../ui/Button";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledLayoutChange = styled.div`
  text-align: center;
`;

const LayoutList = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

function LayoutChange({ layouts }) {
  return (
    <StyledLayoutChange>
      <Heading as="h3">Change Layout</Heading>

      <LayoutList>
        {layouts.map((layout, ind) => (
          <Button size="small" variation="primary" key={ind}>
            {layout}
          </Button>
        ))}
      </LayoutList>
    </StyledLayoutChange>
  );
}

export default LayoutChange;
