FROM ubuntu:16.04

RUN locale-gen en_US.UTF-8
ENV LANG en_US.utf8
ENV LC_ALL en_US.UTF-8

RUN \
  apt-get update && \
  apt-get install -y \
    build-essential \
    zlib1g-dev \
    sqlite3 \
    libsqlite3-dev \
    libssl-dev \
    libreadline-dev \
    libyaml-dev \
    libxml2-dev \
    libxslt-dev \
    ruby2.3 \
    ruby2.3-dev

RUN gem update --system && gem install bundler

RUN mkdir /ganoff.tk
WORKDIR /ganoff.tk
ADD Gemfile /ganoff.tk/Gemfile
ADD Gemfile.lock /ganoff.tk/Gemfile.lock
RUN bundle install
ADD . /ganoff.tk

EXPOSE 9292
CMD ["/usr/local/bin/rackup", "-o", "0.0.0.0", "-p", "3000"]
