#!/bin/bash

set -euo pipefail

docker run --rm debian:node yarn run eslint src
