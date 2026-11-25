import {Config} from '@remotion/cli/config';
import path from 'node:path';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Browser render disimpan di _SISTEM/cache/remotion-browser (bukan di luar folder utama)
Config.setBrowserExecutable(path.resolve(process.cwd(), '../../cache/remotion-browser/chrome-headless-shell-linux64/chrome-headless-shell'));
