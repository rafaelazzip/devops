pipeline {
    stages {
        stage('Build') { 
            steps {
                sh 'mvn clean package Dockerfile:build' 
            }
        }
    }
}
