import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

// Parameters instruction: https://www.npmjs.com/package/react-lite-youtube-embed

export default function YouTube({ytid, yttitle}) {
  return (
    <LiteYouTubeEmbed id={ytid} title={`${yttitle} book video review`} noCookie={true} />
  );
}