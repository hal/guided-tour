# Zanata Guide

## Installation

Follow the steps at http://zanata-client.readthedocs.org/en/latest/#zanata-command-line-client to install the Zanata client on your machine. 

## Usage

Use the script `zanata.sh` to interact with Zanata. The script is a wrapper around the Zanata client and is used to push and pull the translatable resources to and from Zanata. It accepts the following commands:
 
- `help`  -  Shows the available options and a short description.
- `clean` -  Removes all temporary files
- `info`  -  Displays details about the translatable resources such as number of constants, messages and preview files.
- `push`  -  Pushes the i18n resources to Zanata. The resources are first copied to `target/zanata/push`.
- `pull`  -  Pulls the i18n resources from Zanata. The resources are pulled to `target/zanata/pull`.  
