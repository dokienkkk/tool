export const isProjectData = (data: any): boolean => {
  if (!data?.project || !data?.universe || typeof data?.universe !== 'object') {
    return false;
  }
  return true;
};
