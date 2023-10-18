import styled from "@emotion/styled";
import { TabPanel } from "@mui/lab";
import { Box, Container, Paper } from "@mui/material";
import colors from "@styles/colorTheme";

export const ContainerWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TabListWrapper = styled(Box)`
  width: 100%;
  border-bottom: 1;
  border-color: divider;
  max-width: 60vh;
`;

export const SelectImagePaper = styled(Paper)`
  margin-top: 16px;
  position: relative;
  width: 100%;
  max-width: 70vh;
  aspect-ratio: 1/1;
  max-height: 70vh;
  background-color: ${colors.selectGray};
  ${({ backgroundimage }: { backgroundimage: string }) =>
    `background-image: url(${backgroundimage});`}
  background-size: cover;
  background-position: center;
`;

export const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  ${({ currenttab, value }: { currenttab: string; value: string }) =>
    `display: ${currenttab === value ? "flex" : "none"};`}
  flex-direction: column;
  align-items: center;
`;
