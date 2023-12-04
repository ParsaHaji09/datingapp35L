import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';



const theme = createTheme();

theme.typography.h4 = {
  fontSize: '28px',
}

const chipStyles = {
  color: "#FAF9F6",
  borderColor: 'white',
}
const chipIconStyles = {
  color: 'white',
  fontSize: '24px',
  padding: '0px 0px 0px 3px',
};

const socialIconStyles = {
  color: 'white',
  fontSize: '40',
}


const PersonalBio = () => {
  return (
    <div className='glass'>
    <Box sx={{ width: '100%', maxWidth: 360, }}>
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          About Me
        </Typography>
        <Typography color="#FAF9F6" variant="body2">
          Hey, I'm Daemon. In my free time, I run silently 
          in the background to monitor subsystems to ensure
          that my current operating system runs properly. I
          am going to make this bio longer to see how things
          may look if a user's bio becomes long. Right now,
          what you see is what you get.
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip style={chipStyles} variant="outlined" icon={<DarkModeIcon style={chipIconStyles} />} label="Taurus" />
          <Chip style={chipStyles} variant="outlined" icon={<SmokeFreeIcon style={chipIconStyles} />} label="Non-Smoker" />
        </Stack>
      </Box>
      <Divider variant="middle" color="white" />
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          Interests
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip style={chipStyles} variant="outlined" label="CS 111" />
          <Chip style={chipStyles} variant="outlined" label="Eggert" />
          <Chip style={chipStyles} variant="outlined" label="Enrollment Pass" />
          <Chip style={chipStyles} variant="outlined" label="Linux" />
        </Stack>
      </Box>
      <Divider variant="middle" color="white" />
      <Box sx={{ mx: 2, my: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          Socials
        </Typography>
        <Stack direction="row" spacing={0.5} justifyContent={"center"}>
          <IconButton>
            <InstagramIcon style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <FacebookIcon style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <YouTubeIcon style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <RedditIcon style={socialIconStyles} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
    </div>
    
  );
}

export default PersonalBio;