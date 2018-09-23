# desafio-devops

## Antes de tudo é necessário configurar o proxy para evitar inconvenientes

1. Configurando o proxy da máquina virtual e desativando o firewall

```shell
git config --global http.proxy http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export http_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export https_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080
export ftp_proxy=http://$proxyUser:$proxyPassword@proxylatam.indra.es:8080

systemctl disable firewalld
systemctl stop firewalld
dhclient
```


