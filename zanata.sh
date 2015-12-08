#!/usr/bin/env bash

ROOT="$PWD"
SCRIPT=`basename $0`
ARGS=$#
COMMAND=$1
SUB_COMMAND=$2

function usage {
    echo -e "Usage: $SCRIPT <help|clean|info|push|pull>\n"
    echo -e "Zanata wrapper script to push and pull the translatable resources to and from Zanata.\n"
    echo " help  Shows this help"
    echo " clean Removes all temporary files"
    echo " info  Displays details about the translatable resources such as"
    echo "       number of constants, messages and preview files."
    echo " push  Pushes the i18n resources to Zanata."
    echo "       The resources are first copied to target/zanata/push"
    echo " pull  Pulls the i18n resources from Zanata."
    echo "       The resources are pulled to target/zanata/pull"
    exit 1
}

function clean {
    rm -rf target/zanata
}

function info {
    find tour/locales -name "*.json" | xargs wc -l
}

function push {
    mkdir -p target/zanata/push
    cp zanata.xml target/zanata/push
    cp tour/locales/en/*.json target/zanata/push
    cd target/zanata/push
    zanata-cli push --batch-mode --file-types PLAIN_TEXT[json]
    cd "${ROOT}"
}

function pull {
    mkdir -p target/zanata/pull
    cp zanata.xml target/zanata/pull
    cd target/zanata/pull
    zanata-cli pull --batch-mode
    cd "${ROOT}"
}

# Verify Zanata client is available
command -v zanata-cli >/dev/null 2>&1 || { echo >&2 "Zanata client not found. Follow the instructions at http://zanata-client.readthedocs.org/en/latest/#zanata-command-line-client to install the client."; exit 1; }

# Check
if [[ ${ARGS} -eq 0 ]]
then
  usage
fi

# and parse arguments
case ${COMMAND} in
    "help")
        usage
        ;;
    "clean")
        clean
        ;;
    "info")
        info
        ;;
    "push")
        push
        ;;
    "pull")
        pull
        ;;
    *)
        usage
        ;;
esac
