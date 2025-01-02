import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  fetchVideoUrl: (params: { url: string; outputPath: string }) =>
    ipcRenderer.invoke('fetch-video-url', params),
  selectDirectory: () => ipcRenderer.invoke('select-directory') as Promise<string>
});