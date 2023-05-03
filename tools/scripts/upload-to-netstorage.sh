#!/bin/sh
set -e
#set -o pipefail
cpCode=$1
path=$2
domainName=$3
nspath=$4
dryRun=$5

# Upload to NetStorage
if [ "$dryRun" = "true" ]; then
  rsync -anvP -e "ssh -i /root/.ssh/privatekey -o 'HostKeyAlgorithms=+ssh-dss' -o 'StrictHostKeyChecking no'" ${path} sshacs@${domainName}.scp.upload.akamai.com:/${nspath}
else
  rsync -avP -e "ssh -i /root/.ssh/privatekey -o 'HostKeyAlgorithms=+ssh-dss' -o 'StrictHostKeyChecking no'" ${path} sshacs@${domainName}.scp.upload.akamai.com:/${nspath}
fi
