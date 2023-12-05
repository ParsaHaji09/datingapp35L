import * as React from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
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
import { FaDiscord } from "react-icons/fa";
import { BiLogoSnapchat } from "react-icons/bi";
import { FaSpotify } from "react-icons/fa";
import Check from '@mui/icons-material/Check';

const theme = createTheme();

theme.typography.h4 = {
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: '1.5px'
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
  fontSize: '36',
}

const dividerStyles = {
  height: '3px'
}


const Bio = ({userData, other_uid}) => {
  console.log(userData)
  return (
    <div className='glass'>
    <Box sx={{ width: '100%', maxWidth: 360, }}>
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} gutterBottom variant="h4" component="div">
          About Me
        </Typography>
        <Typography color="#FAF9F6" variant="body2">
          {userData.bio}
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Stack direction="row" spacing={1}>
          <Chip style={chipStyles} variant="outlined" icon={<DarkModeIcon style={chipIconStyles} />} label="Taurus" />
          <Chip style={chipStyles} variant="outlined" icon={<SmokeFreeIcon style={chipIconStyles} />} label="Non-Smoker" />
        </Stack>
      </Box>
      <Divider style={dividerStyles} variant="middle" color="white" />
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} fontsgutterbottom="true" variant="h4" component="div">
          Interests
        </Typography>
        <Box sx={{ my: 1 }}>
          <Stack direction="row" spacing={1}>
            {userData.tags.map((item) => (
              <Chip style={chipStyles} variant="outlined" label={item}></Chip>
            ))}
          </Stack>
        </Box>
        <Box sx={{ my: 1 }}>
          <Stack direction="row" spacing={1}>
          </Stack>
        </Box>
      </Box>
      <Divider style={dividerStyles} variant="middle" color="white" />
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
            <BiLogoSnapchat style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <TwitterIcon style={socialIconStyles} />
          </IconButton>
          <IconButton>
            <FaDiscord style={socialIconStyles} />
          </IconButton>
        </Stack>
      </Box>
      {other_uid && (
        <Box sx={{ m: 2 }}>
          <Stack direction="row" spacing={1}>
            <Fab size="medium" color="secondary" aria-label="add">
              <CheckIcon />
            </Fab>
            <Fab size="medium" color="secondary" aria-label="add">
              <ClearIcon />
            </Fab>
          </Stack>
        </Box>
      )}

     

    </Box>
    </div>
    
  );
}

export default Bio;