import fs from 'fs';
import watch from 'node-watch';
import log from 'fancy-log';
import yaml from 'yaml';
import R from 'ramda';
import path from 'path';
import Client from 'ssh2-sftp-client';
import clc from 'cli-color';
import {
  CONFIG_PATH,
  MSG_MISSING_CONFIG,
  MSG_PRESS_TO_EXIT,
  MSG_UPLOADING,
  MSG_UPLOAD_SUCCESS,
  MSG_WATCHING_DIR,
  MSG_WATCH_DIR_MISSING,
  REQUIRED_PROPS
} from './constants';

(function main() {
  try {
    const config = loadConfig();
    const isConfigPropNil = R.pipe(R.prop(R.__, config), R.isNil);
    const findInvalidProp = R.find(isConfigPropNil);

    const invalidProp = findInvalidProp(REQUIRED_PROPS);

    if (invalidProp) throw new Error(MSG_MISSING_CONFIG + invalidProp);
    if (!fs.lstatSync(config.compileDir).isDirectory()) throw new Error(MSG_WATCH_DIR_MISSING);

    const sftpOptions = {
      host: config.sftp_host,
      password: config.sftp_password,
      username: config.sftp_username
    };

    log.info(MSG_WATCHING_DIR + config.compileDir);
    watch(config.compileDir, { recursive: true }, handleWatch);

    function handleWatch(evt: 'update' | 'remove', filePath: string) {
      if (evt === 'update') handleUpload(filePath);
    }

    async function handleUpload(filePath: string) {
      const sftp = new Client();
      try {
        const fileName = path.basename(filePath);
        log.info(MSG_UPLOADING + fileName);
        await sftp.connect(sftpOptions);
        await sftp.fastPut(filePath, [config.sftp_uploadDir, fileName].join('/'));
        log.info(clc.green(MSG_UPLOAD_SUCCESS + fileName));
      } catch (err) {
        log.error(clc.red(err.message));
      } finally {
        sftp.end();
      }
    }
  } catch (error) {
    log.error(clc.red(error));
    log(clc.yellow(MSG_PRESS_TO_EXIT));
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
  }
})();

function loadConfig() {
  const file = fs.readFileSync(CONFIG_PATH, 'utf8');
  return yaml.parse(file);
}
