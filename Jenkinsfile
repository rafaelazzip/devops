pipeline {
   agent any
    stages {
       stage('#1 Cloning Git') {
         steps {
            git 'https://github.com/gustavoapolinario/microservices-node-example-todo-frontend.git'
         }
       }
       stage('#2 Testes') { 
            steps {
                 
            }
        }
       stage('#3 package') { 
            steps {
                sh 'echo build da aplicação'
                sh 'mvn clean package' 
            }
        }
        stage('#4 docker image') {
            steps {
                sh 'echo build da imagem'
                sh 'docker build --tag desafio-devops:1.0 .'
            }
        }
        stage('#5 upload docker image') {
            steps {
                sh 'echo subindo para o dockerhub'
                sh 'docker tag desafio-devops:1.0 brunohafonso95/desafio-devops:1.0'
                sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
                sh 'docker push brunohafonso95/desafio-devops:1.0'
            }
        }
        stage('#6 deploy') {
         sh 'docker run -d -p 80:9090 desafio-devops:1.0'
        }
    }
}
