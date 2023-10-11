import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const InvisibleButton = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
