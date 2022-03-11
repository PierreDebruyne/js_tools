#!/bin/bash

git submodule foreach "git pull origin main && ./git_pull_submodule.sh"