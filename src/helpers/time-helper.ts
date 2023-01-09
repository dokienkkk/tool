import moment from 'moment';

export const formatDate = (date: Date): string => {
  return moment(date).format('DD-MM-YYYY');
};

export const genNameFileExport = (date: Date): string => {
  return moment(date).format('hmmss') + '_' + moment(date).format('DDMMYYYY');
};

export function sleep(ms: number) {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
}
