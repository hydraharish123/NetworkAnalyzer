import styled from "styled-components";
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import Graph from "../features/GraphNetwork/Graph";

import Spinner from "../ui/Spinner";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 40rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
const layouts = ["grid", "circle", "cose", "breadthfirst"];
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar layouts={layouts} />
      <Main>
        <Graph />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
