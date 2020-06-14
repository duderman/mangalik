FROM ubuntu:14.04

RUN apt-get update && sudo apt-get -y upgrade
RUN apt-get install -y exim4
RUN apt-get install -y xtail

RUN rm -rf /etc/exim4 && mkdir -p /etc/exim4
COPY exim4.conf /etc/exim4/exim4.conf

COPY start.sh /exim
RUN chmod +x /exim

VOLUME /var/spool/exim4

COPY sender_redirects /etc/exim4

ENTRYPOINT ["/exim"]
