#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 复制打出的包至 server/public.
cp -R dist/ ./../server/public