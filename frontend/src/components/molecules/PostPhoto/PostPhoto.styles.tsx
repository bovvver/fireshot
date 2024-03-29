import styled from "@emotion/styled";
import colors from "@styles/colorTheme";

export const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
`;
