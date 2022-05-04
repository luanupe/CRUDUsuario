FROM node:12.20.2-alpine

ARG USER=node:node
ARG WORKDIR=/app
ARG MODULES=/node_modules

RUN mkdir -p ${WORKDIR} ${MODULES}
RUN chown -R ${USER} ${WORKDIR} ${MODULES}

WORKDIR ${WORKDIR}
ADD app .

RUN cp .env.example .env
RUN npm install
RUN npm run build
RUN mv node_modules/* ${MODULES}
RUN rm -rf ./node_modules

WORKDIR ${WORKDIR}
USER ${USER}
EXPOSE 8080

CMD npm run start
