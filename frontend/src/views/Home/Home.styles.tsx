import styled from "@emotion/styled";
import { Container, Skeleton } from "@mui/material";

export const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostSkeleton = styled(Skeleton)`
  position: absolute;
  top: -17%;
  max-width: 600px;
  width: 90%;
  height: 1100px;
  margin: 24px 0;
`;
