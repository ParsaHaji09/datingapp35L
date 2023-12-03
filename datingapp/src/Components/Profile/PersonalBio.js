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
  fontSize: '24px',
}

theme.Chip = {
  color: 'red',
}

const PersonalBio = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, }}>
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          About Me
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Hey, I'm Daemon. In my free time, I run silently 
          in the background to monitor subsystems to ensure
          that my current operating system runs properly.
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip variant="outlined" icon={<DarkModeIcon />} label="Taurus" />
          <Chip variant="outlined" icon={<SmokeFreeIcon />} label="Non-Smoker" />
        </Stack>
      </Box>
      <Divider variant="middle" color="#000" />
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          Interests
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip variant="outlined" label="CS 111" />
          <Chip variant="outlined" label="Eggert" />
          <Chip variant="outlined" label="Enrollment Pass" />
          <Chip variant="outlined" label="Linux" />
        </Stack>
      </Box>
      <Divider variant="middle" color="#000" />
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          Socials
        </Typography>
        <Stack direction="row" spacing={0}>
          <IconButton>
            <InstagramIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <YouTubeIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <TwitterIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <RedditIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </Box>


      /* <div style={{ height: "100%", display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <IconButton
          style={{
            alignSelf: 'flex-end', // Align to the bottom of the flex container
            marginLeft: 'auto', // Move to the right within the flex container
            marginTop: 'auto', // Move to the bottom within the flex container
          }}
        >
          <CreateIcon />
        </IconButton>
      </div> */
    
    
  );
}

export default PersonalBio;