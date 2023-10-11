import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

export const LogoFont = styled(Typography)`
  display: flex;
  align-items: center;
  font-family: "Fredoka", sans-serif;
  font-weight: bold;
  ${({ size }: { size: number }) => `font-size: ${size}em;`}
`;

export const LogoIcon = styled(WhatshotIcon)`
  font-size: 1em;
`;
