import {Composition} from 'remotion';
import {TesStudio} from './TesStudio';
export const RemotionRoot = () => (
  <Composition id="TesStudio" component={TesStudio} durationInFrames={90} fps={30} width={1080} height={1920}
    defaultProps={{judul: 'Studio Siap'}} />
);
