# amxx sftp uploader

## What is this?

A tool to help automate .amxx file upload to your server. We watch your compilation directory ("compiled") for newly created/updated .amxx files and upload them to your server.

## How can use it?

Download an executable from a [release page](https://github.com/fleshascs/amx_sftp_uploader/releases) or compile your own.
Before using make sure to configure your config.yml file.

- [Release builds for windows](https://github.com/fleshascs/amx_sftp_uploader/releases)

## Configuration (config.yml)

| Property name  | Description                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| sftp_host      | your server ip or domain name                                                                                         |
| sftp_username  | your server username                                                                                                  |
| sftp_password  | your server password                                                                                                  |
| sftp_uploadDir | directory where files will be uploaded                                                                                |
| compileDir     | your local dir which will be watched for any changes, created new/changed files will be uploaded to your defined host |

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
