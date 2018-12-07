pipeline {
   agent any
    stages {
       stage('#1 Git') {
            steps {
                git 'https://github.com/brunohafonso95/desafio-devops.git'
            }  
       }
       stage('#2 SonarQube analise') {
            steps {
                sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.56.101:9000 -Dsonar.login=d8c853725aeea36b3f275ad7549ad3b604d2859d'
            }
       }
       stage('#3 Testes') { 
            steps {
               sh 'mvn test'  
            }
        }
       stage('#4 Package') { 
            steps {
                sh 'echo build da aplicação'
                sh 'mvn clean package' 
            }
        }
        stage('#5 Docker image') {
            steps {
                sh 'echo build da imagem'
                sh 'docker build --tag desafio-devops:1.0 .'
            }
        }
        stage('#6 Upload docker image') {
            steps {
                withCredentials([string(credentialsId: 'user_name', variable: 'USER_NAME'), string(credentialsId: 'user_password', variable: 'USER_PASSWORD')]) {
                    sh 'echo subindo para o dockerhub'
                    sh 'docker tag desafio-devops:1.0 brunohafonso95/desafio-jps:1.0'
                    sh 'docker login -u $USER_NAME -p $USER_PASSWORD'
                    sh 'docker push brunohafonso95/desafio-jps:1.0'
                }
            }
        }
        stage('#7 Deploy') {
            steps {
                sh 'docker run -d -p 82:8080 desafio-devops:1.0'
            }
        }
    }
} 
#
