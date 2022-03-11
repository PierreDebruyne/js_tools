#!/bin/bash

git pull origin main &&
git submodule foreach ./git_pull.sh