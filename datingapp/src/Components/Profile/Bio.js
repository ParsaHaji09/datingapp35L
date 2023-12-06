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
import SocialButton from './SocialButton';

const instagramUsername = 'instagram_username';
const spotifyUsername = 'spotify_username';
const snapchatUsername = 'snapchat_username';
const tiktokUsername  = 'tiktok_username';
const facebookUsername = 'facebook_username';
const twitterUsername = 'twitter_username';


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
      <Divider style={dividerStyles} variant="middle" color="white" />
      <Box sx={{ m: 2 }}>
        <Typography theme={theme} fontsgutterbottom="true" variant="h4" component="div">
          Interests
        </Typography>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap',  justifyContent: 'center', paddingTop: "12px" }}>
          {userData.tags.map((item) => (
            <Chip style={chipStyles} variant="outlined" label={item}></Chip>
          ))}
        </div>
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
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap',  justifyContent: 'center' }}>
          <SocialButton socialMedia="instagram" userName={userData.instagram} />
          <SocialButton socialMedia="snapchat" userName={userData.snapchat} />
          <SocialButton socialMedia="facebook" userName={userData.facebook} />
          <SocialButton socialMedia="spotify" userName={userData.spotify} />
          <SocialButton socialMedia="twitter" userName={userData.twitter} />
          <SocialButton socialMedia="tiktok" userName={userData.tiktok} />

        </div>
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