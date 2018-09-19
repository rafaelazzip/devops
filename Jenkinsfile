pipeline {
   agent {
       args '-v /root/.m2:/root/.m2' 
    }
    stages {
       stage('Build') { 
            steps {
                sh 'mvn clean package Dockerfile:build' 
            }
        }
    }
}
