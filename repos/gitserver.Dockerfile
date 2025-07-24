# use lightweight node.js image based on alpine linux (faster), is the base image of the container
FROM node:alpine

# ❌ 🔐 git server WITHOUT ssh access ======
# install tini (minimal init system)
RUN apk add --no-cache tini git \ 
# install git-http-server using Yarn
    && yarn global add git-http-server \
# add system user named "git", without a password (-D), assigning to the group (-g) "git"
    && adduser -D -g git git

#switch to the user "git"
USER git
# set the working directory to "/home/git"
WORKDIR /home/git

# initialise a bare git repo called repository.git inside /home/git
# this will allow the repository to push and pull without a working directory
RUN git init --bare repository.git

# === you set the STARTUP COMMAND for the container ===
# This command starts an HTTP Git server when the container launches. Indicates that the server:
# Listens on port 3000
# Serves Git repositories from /home/git
# Allows users (e.g. you or teammates) to run Git commands on your host,
ENTRYPOINT ["tini", "--", "git-http-server", "-p", "3000", "/home/git"]
# === command meaning ===
# tini: manage child processes and handle signal property
# git-http-server: a tool that serves your Git repositories over HTTP
# -p and 3000: runs on port 3000
# /home/git: the directory it serves