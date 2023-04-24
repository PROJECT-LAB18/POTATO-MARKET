import * as path from "node:path";

import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import react from "@vitejs/plugin-react-swc";
import imageminGifSicle from "imagemin-gifsicle";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngQuant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
