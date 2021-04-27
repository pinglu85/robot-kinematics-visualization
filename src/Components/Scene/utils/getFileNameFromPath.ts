import type { FileInfo } from '../../../types';

function getFileNameFromPath(path: string): FileInfo {
  const lastSlash = path.lastIndexOf('/');
  const fileName = path.slice(lastSlash + 1);
  return {
    fileName,
    fileExtension: fileName.split('.')[1].toLowerCase(),
  };
}

export default getFileNameFromPath;
