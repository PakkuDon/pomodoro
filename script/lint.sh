#!/bin/bash

set -euo pipefail

docker run --rm debian:node yarn lint
