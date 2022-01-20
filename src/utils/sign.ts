import crypto from 'crypto';

export const validateRequest = ({ data, sign, timestamp }: { data: unknown; sign: string; timestamp: number }) => {
  if (Date.now() - timestamp > 10 * 1000) {
    throw new Error('Request is outdated.');
  }
  const toSign = `${JSON.stringify(data)}_${timestamp}`;
  const expect = crypto.createHmac('sha256', 'pixland').update(toSign).digest('hex');
  if (expect !== sign) {
    throw new Error('Sign is invalid.');
  }
};
