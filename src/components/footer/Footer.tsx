import { Typography } from "@mui/material";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography sx={{ color: "gray" }} variant="body2">
        Складская система © 2023 | ninjadevs@gmail.com
      </Typography>
    </footer>
  );
};

export default Footer;
