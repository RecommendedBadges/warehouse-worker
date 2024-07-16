FROM amd64/node:18

RUN apt-get update --error-on=any
RUN apt-get upgrade -y --no-install-recommends
RUN apt-get install -y --no-install-recommends git

ADD ./app /opt/app
WORKDIR /opt/app
RUN npm install -g

RUN adduser myuser --quiet
USER myuser