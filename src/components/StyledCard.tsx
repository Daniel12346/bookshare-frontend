import styled from "styled-components";

export default styled.li`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 90%;
  max-width: 40rem;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  min-height: 5rem;
  margin-bottom: 6vh;
  cursor: pointer;
  background: white;
  > img {
          flex: 0 0 auto;
    margin: 0.5rem;
  }
`;
