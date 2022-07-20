# amxx sftp uploader

## Compile into linux/windows executable

make sure to have a pkg installed

```sh
npm install -g pkg
```

```shell script
# for linux
npm run build && npm run build:linux

# for windows
npm run build && npm run build:windows
```

## config.yml

| Output name   | Description                   |
| ------------- | ----------------------------- |
| sftp_host     | your server ip or domain name |
| sftp_username | your server username          |
| sftp_password | your server password          |
