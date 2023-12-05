import { Typography } from "@mui/material";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography sx={{ color: "gray" }} variant="body2">
        RemOnline © 2012-2023 | support@remonline.app English
      </Typography>
    </footer>
  );
};

export default Footer;
