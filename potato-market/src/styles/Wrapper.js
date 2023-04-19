import styled from "styled-components";

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 480px) {
    width: 90%;
  }
`;

export default Wrapper;