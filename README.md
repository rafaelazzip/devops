# desafio-devops

## Antes de tudo é necessário configurar o proxy para evitar inconvenientes

1. Configurando o proxy da máquina virtual e desativando o firewall

Digite estes comandos no terminal da vm (substitua $proxyUser e $proxyPassword pelo seu usuário e senha do proxy)

```shell
git config --global http.proxy http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export http_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export https_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export ftp_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080

systemctl disable firewalld
systemctl stop firewalld
dhclient
```
após isso acessar a pasta etc e criar um arquivo chamado environment e escrever nele o seguinte texto:

```shell
export http_proxy="http://usuario:%senha@proxylatam.indra.es:8080"
export https_proxy="http://usuario:%senha@proxylatam.indra.es:8080"
export ftp_proxy="http://usuario:%senha@proxylatam.indra.es:8080"
export no_proxy="localhost,127.0.0.0,192.168.56.101,172.20.148.72"
export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64/jre/bin/java"
```
2. Configurando o docker





