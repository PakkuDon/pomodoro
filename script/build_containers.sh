#!/bin/bash

set -euo pipefail

docker build . -t debian:node
