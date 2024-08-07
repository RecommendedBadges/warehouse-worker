FROM amd64/node:18

RUN apt-get update --error-on=any
RUN apt-get upgrade -y --no-install-recommends
RUN apt-get install -y --no-install-recommends git

ADD ./app /opt/app
WORKDIR /opt/app
RUN npm ci
ENV PATH="$PATH:/opt/app/node_modules/@salesforce/cli/bin"

RUN adduser myuser --quiet
USER myuser