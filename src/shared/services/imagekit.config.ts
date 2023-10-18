import ImageKit from 'imagekit';
import { env } from '../config/env';

const imagekit = new ImageKit({
    publicKey: env.imagekitPublicKey,
    privateKey: env.imagekitSecretKey,
    urlEndpoint: `https://ik.imagekit.io/${env.imagekitId}`,
});

export { imagekit };
