/**
 * Função para validar se uma string é uma URL válida
 * @param url - A string que será validada
 * @returns true se a URL for válida, false caso contrário
 */
export default function isValidURL(url: string): boolean {
    try {
        // Tenta criar uma nova URL; se falhar, é inválido
        const urlObj = new URL(url);

        // Verifica se o protocolo é HTTP ou HTTPS
        return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch (error) {
        return false;
    }
}
