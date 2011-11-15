#!/bin/bash
rsync -av --del --progress --exclude='node_modules' . mxc:~/public_subdomains/mxc_startpage
