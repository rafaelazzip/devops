pipeline {
   agent any
    stages {
       stage('#1 Git') {
         steps {
            git 'https://github.com/brunohafonso95/desafio-devops.git'
         }
       }
       stage('#2 Testes') { 
            steps {
               sh 'echo testes'  
            }
        }
       stage('#3 Package') { 
            steps {
                sh 'echo build da aplicação'
                sh 'mvn clean package' 
            }
        }
        stage('#4 Docker image') {
            steps {
                sh 'echo build da imagem'
                sh 'docker build --tag desafio-devops:1.0 .'
            }
        }
        stage('#5 Upload docker image') {
            steps {
                sh 'echo subindo para o dockerhub'
                sh 'docker tag desafio-devops:1.0 192.168.56.101:5000/desafio-devops:1.0'
                sh 'docker push 192.168.56.101:5000/desafio-devops:1.0'
            }
        }
        stage('#6 Deploy') {
         steps {
             sh 'docker run -d -p 80:9090 desafio-devops:1.0'
         }
        }
    }
}
