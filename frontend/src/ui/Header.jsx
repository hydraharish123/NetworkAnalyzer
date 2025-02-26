import styled from "styled-components";
import Logo from "./Logo";
import Heading from "./Heading";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2.4rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  justify-content: center;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderDiv>
        <Heading as="h1">Network Analyser</Heading>
        <Logo />
      </HeaderDiv>
    </StyledHeader>
  );
}

export default Header;
