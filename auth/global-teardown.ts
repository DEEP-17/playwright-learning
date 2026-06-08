import fs from 'fs';
import path from 'path';
import { AUTH_STATE_PATH } from './authState';

async function globalTeardown() {
  if (process.env.PW_KEEP_AUTH_STATE === 'true') {
    return;
  }

  await fs.promises.rm(AUTH_STATE_PATH, { force: true });
  await fs.promises.rmdir(path.dirname(AUTH_STATE_PATH)).catch(() => undefined);
}

export default globalTeardown;
