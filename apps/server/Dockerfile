FROM app

# create & set working directory
RUN mkdir -p /home/node/main_ts-hubcli
WORKDIR /home/node/main_ts-hubcli

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of server
RUN mkdir -p apps/server/dist
COPY --chown=node ./apps/server/package.json ./apps/server/
COPY --chown=node ./apps/server/dist ./apps/server/dist

# install dependencies
RUN npm install -w server --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "server", "start" ]
