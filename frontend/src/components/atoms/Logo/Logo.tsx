import { LogoFont, LogoIcon } from "./Logo.styles";

const Logo = ({ size = 2 }: { size?: number }) => {
  return (
    <LogoFont variant="h2" color="primary" size={size}>
      <LogoIcon />
      Fireshot
    </LogoFont>
  );
};

export default Logo;
