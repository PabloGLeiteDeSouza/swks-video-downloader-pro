import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'path';
import ytdl from '@distube/ytdl-core';
import fs from 'fs-extra';
import dotenv from 'dotenv';
dotenv.config();

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  ipcMain.handle('select-directory', async () => {
    if (win) {
      const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory'],
      });
      return result.filePaths[0];
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

ipcMain.handle(
  'fetch-video-url',
  async (_, { url, outputPath }: { url: string; outputPath: string }): Promise<string> => {
    try {
      // Validar URL e obter informações do vídeo
      if (!ytdl.validateURL(url)) {
        throw new Error('URL inválida ou não suportada.');
      }
      const info = await ytdl.getInfo(url);

      // Gerar nome de arquivo seguro
      const title = info.videoDetails.title.replace(/[<>:"/\\|?*]/g, ''); // Remover caracteres inválidos
      const videoPath = path.join(outputPath, `${title}.mp4`);

      // Garantir que o diretório de destino exista
      await fs.ensureDir(path.dirname(videoPath));

      console.log(`Iniciando download do vídeo: ${info.videoDetails.title}`);

      const videoWriteStream = fs.createWriteStream(videoPath);

      // Baixar o vídeo e áudio combinados
      const res = ytdl(url, { 
        quality: 'highest',
        filter: 'audioandvideo', // Baixa vídeo e áudio combinados, se disponível
      }).pipe(videoWriteStream);

      // Gerenciar eventos de stream
      const result = await new Promise<string>((resolve, reject) => {
        res.on('error', (error) => {
          console.error('Erro no download do vídeo:', error);
          reject(error);
        });
        res.on('finish', () => {
          console.log(`Download concluído: ${videoPath}`);
          resolve(`Vídeo baixado com sucesso na pasta: ${videoPath}`);
        });
      });

      return result;
    } catch (error: unknown) {
      console.error('Erro geral:', error);
      throw new Error(`Erro durante o processo: ${(error as Error).message}`);
    }
  }
);

// // Função para baixar o vídeo
// async function downloadVideo(url: string, outputPath: string): Promise<void> {
//   const file = fs.createWriteStream(outputPath);

//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (response) => {
//         response.pipe(file);
//         file.on('finish', () => {
//           file.close(resolve);
//         });
//       })
//       .on('error', (error) => {
//         fs.unlink(outputPath);
//         reject(error.message);
//       });
//   });
// }