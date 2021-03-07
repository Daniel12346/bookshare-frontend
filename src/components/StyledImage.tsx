import styled from "styled-components";

interface StyledImageProps {
    large?: boolean;
    withBorder?: boolean;
    withShadow?: boolean;
}

export default styled.img<StyledImageProps> `
  height: ${({ large }) => (large ? "6rem" : "2.5rem")};
  width: ${({ large }) => (large ? "6rem" : "2.5rem")};
  display: block;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
  border: ${({ withBorder }) => (withBorder ? "3px white solid" : "none")};
  box-shadow: ${({ withShadow }) => (withShadow ? "-1px 1px 1px rgba(0, 0, 0, 0.29)" : "none")};
`;

