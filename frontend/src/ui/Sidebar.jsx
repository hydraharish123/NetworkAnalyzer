import styled from "styled-components";

import Heading from "./Heading";
import LayoutChange from "../features/SidebarDetails/LayoutChange";
import SearchNodesByID from "../features/SidebarDetails/SearchNodesByID";
import GraphDetails from "../features/SidebarDetails/GraphDetails";
import Button from "./Button";
import DownloadButton from "../features/SidebarDetails/DownloadButton";
import Centralities from "../features/SidebarDetails/Centralities";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

function Sidebar({ layouts }) {
  return (
    <StyledSidebar>
      <Heading
        as="h2"
        style={{
          textAlign: "center",
        }}
      >
        Network Details
      </Heading>
      <LayoutChange layouts={layouts} />
      <SearchNodesByID />
      <Centralities />
      <GraphDetails />
      <DownloadButton />
    </StyledSidebar>
  );
}

export default Sidebar;
