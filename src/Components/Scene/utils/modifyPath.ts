function modifyPath(path: string): string {
  const lastSlash = path.lastIndexOf('/');
  return path.slice(lastSlash + 1);
}

export default modifyPath;
