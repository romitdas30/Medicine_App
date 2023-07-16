import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Login, Singup } from "../components";

const Landing = () => {
  const [value, setValue] = useState("1");
 
  const handleChange = (event, newValue) => {
   setValue(newValue);
 };

 return (
   <TabContext value={value}>
     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
       <TabList  onChange={handleChange} aria-label="lab API tabs example">
         <Tab label="Singup" value="1"/>
         <Tab label="Login" value="2"/>
       </TabList>
     </Box>
     <TabPanel value="1">
          <Singup handleChange={handleChange} />
     </TabPanel>
     <TabPanel value="2">
          <Login handleChange={handleChange} />
     </TabPanel>
   </TabContext>
 );
};

export default Landing;
