import * as crypto from 'crypto';

export const getFileKey = (username: string, password: string) => {
  const hmac = crypto.createHmac('sha256', 'pixland').update(`${username}_${password}`).digest('hex');
  return crypto.createHmac('sha1', 'pixland').update(hmac).digest('hex');
};
