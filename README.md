# desafio-devops

## Antes de tudo é necessário configurar o proxy para evitar inconvenientes


### 1. Configurando o proxy da máquina virtual para utilizar as ferramentas e desativando o firewall

    Digite estes comandos no terminal da vm (substitua $proxyUser e $proxyPassword pelo seu usuário e 
    senha do proxy e trocar o endereço do proxy pelo proxy da sua empresa)

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

    Executar no terminal o seguinte comando:

```shell
yum install java-1.8.0-openjdk-devel
export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64/jre/bin/java"
```

    Para testar a instalação execute o comando 

```shell
java -version
```

    Deve retornar o seguinte texto:

    java version "1.8.0_181"
    Java(TM) SE Runtime Environment (build 1.8.0_181-b13)
    Java HotSpot(TM) 64-Bit Server VM (build 25.181-b13, mixed mode)

### 4. Instalando e Configurando o MAVEN

    Executar os seguintes comandos no terminal:

```shell
wget http://www.eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
tar xzf apache-maven-3.3.9-bin.tar.gz
mkdir /usr/local/maven
mv apache-maven-3.3.9/ /usr/local/maven/
alternatives --install /usr/bin/mvn mvn /usr/local/maven/apache-maven-3.3.9/bin/mvn 1
alternatives --config mvn
```

    Para testar a instalação executar o seguinte comando:

```shell
mvn --version
```

    Deve retornar o seguinte texto:

    Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T14:41:47-02:00)
    Maven home: /usr/local/maven/apache-maven-3.3.9
    Java version: 1.8.0_181, vendor: Oracle Corporation
    Java home: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64/jre
    Default locale: en_US, platform encoding: UTF-8
    OS name: "linux", version: "3.10.0-862.11.6.el7.x86_64", arch: "amd64", family: "unix"

    Para configurar o proxy do maven deve se digitar o seguinte comando no terminal:

```shell
vi /usr/local/maven/apache-maven-3.3.9/conf/settings.xml
```

    Ao abrir o arquivo procurar por proxy e preencher as credenciais do proxy da sua rede

### 5. Instalando e Configurando o Jenkins

    Para instalar digitar o seguinte comando no terminal:

```shell
yum install jenkins
systemctl enable jenkins
systemctl start jenkins jenkins
```

    Digite no navegador o ip ou dns do servidor e a porta da seguinte forma http://ip:8080 e seguir os 
    passos da instalação

    no primeiro passo será solicitado o secret, acessar o endereço informado na tela para pegar esse secret

    configurar proxy passando as credenciais o link deve ser sem http://

    selecionar a opção de instalar suggestd plugins

    configurar usuário admin (anotar este usuário e senha, pois eles serão 
    necessários para usar a ferramenta.)

    Adicionar o jenkins no grupo do docker para que o mesmo tenha permissão de utiliza-lo, execute no terminal:

```shell
usermod -aG docker jenkins
usermod -aG root jenkins
chmod 777 /var/run/docker.sock
```

### 6. Instalando e configurando o SonarQube

    Executar no terminal

```shell
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

    Aguardar a o download da imagem e o inicio do container, após acessar http://ip:9000, 
    logar com o usuário admin e senha admin, ao logar seguir os seguintes passos:

    1. digitar um nome e clicar em generate e depois continue

![passo 1 sonarqube](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/sonarqube_1.png "passo 1 sonarqube")

    2. selecionar JAVA e MAVEN

![passo 2 sonarqube](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/sonarqube_2.png "passo 2 sonarqube")

    3. clicar em copy para copiar o camando de execução do sonarqube

![passo 3 sonarqube](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/sonarqube_3.png "passo 3 sonarqube")

    E a configuração do sonarqube estará finalizada 

    Você deve salvar esta comando pois ele será necessário na configuração da pipeline

```shell
mvn sonar:sonar -Dsonar.host.url=http://192.168.56.101:9000 -Dsonar.login=108ad501c37119c6ec07a65bbf7dacaf71b48a1d
```

### 7. Configurando pipeline no Jenkins

1. Clicar em novo job definir um nome, selecionar pipeline e clicar em ok

![passo 1 jenkins](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/jenkins_1.png "passo 1 jenkins")

2. Ir até a seção de Build Triggers, selecionar Consultar periodicamente o SCM 
e preencher o campo que será habilitado com "* * * * *" 
(Obs: o espaço entra os asteriscos é proposital)

![passo 2 jenkins](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/jenkins_2.png "passo 2 jenkins")

3. Ir até a Pipeline e o campo definition deixar como pipeline script e preencher o 
campo script com o código da pipeline:

```shell
# bloco da pipeline o script todo fica dentro de bloco
pipeline {
   # qual agente quefara os processos, pode ser um container docker, 
   # neste caso ele vai executar no agent que está disponivel por isso a marcação any
   agent any
    # bloco onde ficam os estagio de execução da pipeline
    stages {
       # bloco do primeiro estagio clone do repositorio
       stage('#1 Git') {
            # passos do estagio
            steps {
                # neste passo está sendo feito o clone do repositorio
                git 'https://github.com/brunohafonso95/desafio-devops.git'
            }  
       }
       # bloco do segundo estagio
       stage('#2 SonarQube analise') {
            # passos do estagio
            steps {
                # executando o sonarqube no projeto
                sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.56.101:9000 -Dsonar.login=108ad501c37119c6ec07a65bbf7dacaf71b48a1d'
            }
       }
       # bloco do terceiro estagio
       stage('#3 Testes') { 
            # passos do estagio
            steps {
               # executando os testes da aplicação
               sh 'mvn test'  
            }
        }
        # bloco do quarto estagio
       stage('#4 Package') { 
            # passos do estagio
            steps {
                # buildando a aplicação
                sh 'mvn clean package' 
            }
        }
        # bloco do quinto estagio
        stage('#5 Docker image') {
            # passos do estagio
            steps {
                # gerando o imagem com a aplicação
                sh 'docker build --tag desafio-devops:1.0 .'
            }
        }
        # bloco do sexto estagio
        stage('#6 Upload docker image') {
            # passos do estagio
            steps {
                # inserindo credencials de acesso em forma de injeção de variaveis
                withCredentials([string(credentialsId: 'user_name', variable: 'USER_NAME'), 
                string(credentialsId: 'user_password', variable: 'USER_PASSWORD')]) {
                    # preparando imagem para push no dockerhub
                    sh 'docker tag desafio-devops:1.0 brunohafonso95/desafio-jps:1.0'
                    # efetuando o login com as credenciais injetadas
                    sh 'docker login -u $USER_NAME -p $USER_PASSWORD'
                    # fazendo o push da imagem para o docker hub
                    sh 'docker push brunohafonso95/desafio-jps:1.0'
                }
            }
        }
        # bloco do setimo estagio
        stage('#7 Deploy') {
            # passos do estagio
            steps {
                # rodando o a imagem da aplicação num container
                sh 'docker run -d -p 82:8080 desafio-devops:1.0'
            }
        }
    }
}
```

4. Clicar em aplicar e salvar

5. Configurar as credenciais de acesso ao dockerhub

    Clicar em credentials no painel inicial do Jenkins depois clicar em system abaixo de credentials e depois do lado esquerdo clicar em global credentials

![passo 5 jenkins](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/jenkins_5.png "passo 5 jenkins")

    Clicar em add credentials e no campo Kind selecionar secret text

![passo 6 jenkins](https://raw.githubusercontent.com/brunohafonso95/desafio-devops/master/images/jenkins_6.png "passo 6 jenkins")

    No campo Secret preencher o nome do usuário do dockerhub e no campo ID preencher com user_name e clicar em
    ok, repetir o mesmo processo para a senha informando o campo Secret com o senha do dockerhub 
    e o campo ID com user_password

6. Voltar para o painel inicial do jenkins e clicar na pipeline criada, após isso clicar em construir agora 
para iniciar um build da aplicação, o mesmo irá aparecer em histórico de builds, clique nele e acompanhe o status do build em saída do console.

### se tudo estiver certo e configurado e o nosso amigo proxy colaborar o build será executado com sucesso e você poderá ver a aplicação rodando em http://ip:82.



