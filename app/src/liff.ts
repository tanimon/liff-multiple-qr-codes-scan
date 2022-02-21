import * as config from './config';
import realLiff from '@line/liff';
import { buildNiseliff } from '@niseline/niseliff';

const liff =
  config.env === 'local'
    ? buildNiseliff({ liffId: 'DUMMY_LIFF_ID' })
    : realLiff;
export default liff;
