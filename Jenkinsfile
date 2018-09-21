pipeline {
   agent any
    stages {
       stage(‘Cloning Git’) {
         steps {
            git ‘https://github.com/gustavoapolinario/microservices-node-example-todo-frontend.git'
         }
       }
       stage('Build da aplicação') { 
            steps {
                sh 'echo build da aplicação'
                sh 'mvn clean package' 
            }
        }
        stage('build da imagem') {
            steps {
                sh 'echo build da imagem'
                sh 'docker build --tag desafio-devops:1.0 .'
            }
        }
        stage ('subindo para o dockerhub') {
            steps {
                sh 'echo subindo para o dockerhub'
                sh 'docker tag desafio-devops:1.0 brunohafonso95/desafio-devops:1.0'
                sh 'docker login -u $DOCKER_USER -p $DOCKER_PASSWORD'
                sh 'docker push brunohafonso95/desafio-devops:1.0'
            }
        }
    }
}
