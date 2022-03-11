#!/bin/bash

git submodule foreach --recursive "git pull origin main && git submodule update && ./git_pull_submodule.sh"