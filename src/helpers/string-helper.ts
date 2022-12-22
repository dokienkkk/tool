const DEFAULT_LENGTH = 20;

export const numberOfLines = (
  title: string,
  lengthTitle: number = DEFAULT_LENGTH,
): string =>
  title.substring(0, lengthTitle ?? DEFAULT_LENGTH) +
  (title.length > (lengthTitle ?? DEFAULT_LENGTH) ? '...' : '');
