pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        AWS_REGION = 'us-west-2'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'nx run medical-models:build'
                sh 'nx run medical-models:deploy'
            }
        }
    }
}


