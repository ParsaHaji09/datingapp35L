import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaTiktok as TikTokIcon } from "react-icons/fa";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { BiLogoSnapchat as SnapchatIcon } from "react-icons/bi";

const SocialButton = ({ socialMedia, userName }) => {
  const socialIconStyles = { 
    fontSize: 34,
    color: 'white'
  };


  const openSocialLink = () => {
    let socialUrl = '';

    // Concatenate the user name with the social media link based on the specified type
    switch (socialMedia) {
      case 'instagram':
        socialUrl = `https://www.instagram.com/${userName}/`;
        break;
      case 'snapchat':
        socialUrl = `https://www.snapchat.com/add/${userName}`;
        break;
      case 'facebook':
        socialUrl = `https://www.facebook.com/${userName}`;
        break;
      case 'spotify':
        socialUrl = `https://open.spotify.com/user/${userName}`;
        break;
      case 'twitter':
        socialUrl = `https://twitter.com/${userName}`;
        break;
      case 'tiktok':
        const tiktokUserName = userName.startsWith('@') ? userName.slice(1) : userName;
        socialUrl = `https://www.tiktok.com/@${tiktokUserName}`;
        break;
      default:
        // Handle unsupported social media types or provide a default link
        socialUrl = 'https://www.example.com/';
    }

    window.open(socialUrl, '_blank');
  };

  // Determine which icon to render based on the specified social media type
  const renderSocialIcon = () => {
    switch (socialMedia) {
      case 'instagram':
        return <InstagramIcon style={socialIconStyles} />;
      case 'snapchat':
        return <SnapchatIcon style={socialIconStyles} />;
      case 'facebook':
        return <FacebookIcon style={socialIconStyles} />;
      case 'spotify':
        return <SpotifyIcon style={socialIconStyles} />;
      case 'twitter':
        return <TwitterIcon style={socialIconStyles} />;
      case 'tiktok':
        return <TikTokIcon style={socialIconStyles} />;
      default:
        return null;
    }
  };

  return (
    <IconButton onClick={openSocialLink}>
      {renderSocialIcon()}
    </IconButton>
  );
};

export default SocialButton;
