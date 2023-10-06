import { Box, } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box width="100%" height="100%">
   
      <Box>
        
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
