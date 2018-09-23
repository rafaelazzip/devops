# desafio-devops

## Antes de tudo é necessário configurar o proxy para evitar inconvenientes


### 1. Configurando o proxy da máquina virtual para utilizar as ferramentas e desativando o firewall

    Digite estes comandos no terminal da vm (substitua $proxyUser e $proxyPassword pelo seu usuário e senha do proxy e trocar o endereço do proxy pelo proxy da sua empresa)

```shell
git config --global http.proxy http://$proxyUser:$proxyPassword@proxy.com:porta
export http_proxy=http://$proxyUser:$proxyPassword@proxy.com:porta
export https_proxy=http://$proxyUser:$proxyPassword@proxy.com:porta
export ftp_proxy=http://$proxyUser:$proxyPassword@proxy.com:porta

systemctl disable firewalld
systemctl stop firewalld
dhclient
```

    após isso acessar a pasta etc e criar um arquivo chamado environment e escrever nele o seguinte texto:

```shell
export http_proxy="http://usuario:%senha@proxy.com:porta"
export https_proxy="http://usuario:%senha@proxy.com:porta"
export ftp_proxy="http://usuario:%senha@proxy.com:porta"
export no_proxy="localhost,127.0.0.0,192.168.56.101,172.20.148.72"
export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64/jre/bin/java"
```


### 2. Instalando e Configurando o docker

    digitar no terminal

```shell
setenforce 0
vi /etc/selinux/config
```

    Procurar por SELINUX e alterar para:
    
    SELINUX=disabled

    digitar no terminal

```shell
dhclient
vi /etc/sysconfig/network-scripts/ifcfg-*
```
    Procurar por ONBOOT e alterar para:
    
    ONBOOT=yes

    Após isso instalar e iniciar o docker usando os seguintes comandos:

```shell
curl -s https://get.docker.com | bash
systemctl enable docker.service
systemctl start docker.service
usermod -a -g docker root
```

    Para configurar o proxy do docker usar o seguinte comando:

```shell
mkdir /etc/systemd/system/docker.service.d
cd /etc/systemd/system/docker.service.d
vi http-proxy.conf
```

    Digitar o seguinte texto e salvar o arquivo
    [Service]
    Environment="HTTP_PROXY=http://usuario:%senha@proxy.com:porta"
    Environment="NO_PROXY=localhost,172.20.148.72,10.130.214.119"

    Para testar digite o seguinte comando no terminal:

```shell
docker run hello-world
```

    Esse comando deve retornar a seguinte mensagem

    Hello from Docker!
    This message shows that your installation appears to be working correctly.


### 3. Instalando e configurando o JDK
Executar no terminal o seguinte comando



