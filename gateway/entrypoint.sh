#!/bin/bash

if [[ $? == 0 ]]; then
  cd /etc/app
  /wait-for-it.sh auth-service:4001 --timeout=5 --strict -- yarn dev
fi