import styled from "@emotion/styled";
import { Container, Box, Paper, colors } from "@mui/material";

export const AuthenticationBackground = styled(Box)`
  background-color: "#102811";
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23102811' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23163919' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%231d4a20' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23245c28' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%232b6f2f' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23338237' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");

  //  background by SVGBackgrounds.com

  background-attachment: fixed;
  background-size: cover;
  background-position: center;
`;

export const AuthenticationContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthenticationPaper = styled(Paper)`
  padding: 40px;
  border-top: 3px solid ${colors.green};
`;
