import Button from "../../ui/Button";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useLayoutContext } from "../../contexts/LayoutsContext";

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
  const { curlayout, cyRef, setcurLayout } = useLayoutContext();
  const applyLayout = (layoutName) => {
    if (cyRef.current && cyRef.current.cy) {
      cyRef.current.cy.layout({ name: layoutName }).run();
    }
  };
  return (
    <StyledLayoutChange>
      <Heading as="h3">Change Layout</Heading>

      <LayoutList>
        {layouts.map((layout, ind) => (
          <Button
            size="small"
            variation={`${layout === curlayout ? "danger" : "primary"}`}
            key={ind}
            onClick={() => {
              setcurLayout(layout);
              applyLayout(layout);
            }}
          >
            {layout}
          </Button>
        ))}
      </LayoutList>
    </StyledLayoutChange>
  );
}

export default LayoutChange;
