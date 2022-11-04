import { restCall } from 'utils/restHandler';
// eslint-disable-next-line no-unused-vars
import { DELETE, PUT, GET, POST } from 'utils/requestTypes';

export const sendGetHealth = () => restCall<unknown>(GET, '/health');
