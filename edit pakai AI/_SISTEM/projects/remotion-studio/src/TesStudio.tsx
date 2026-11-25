import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
export const TesStudio: React.FC<{judul: string}> = ({judul}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 12}});
  const o = interpolate(f, [60, 90], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg,#111,#2b2d42)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{transform: `scale(${s})`, opacity: o, color: 'white', fontSize: 120, fontWeight: 800, fontFamily: 'sans-serif', textAlign: 'center'}}>
        {judul}<div style={{fontSize: 48, color: '#ef233c'}}>Remotion OK</div>
      </div>
    </AbsoluteFill>
  );
};
