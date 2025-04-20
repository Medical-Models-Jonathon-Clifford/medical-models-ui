pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerHubCredentials')
        MY_KUBECONFIG = credentials('kubeConfigFile')
    }
    stages {
        stage('Build') {
            steps {
                echo '------ Node Version ------'
                sh 'node -v'
                echo '------ NPM Version -------'
                sh 'npm -v'
                echo '------ Build mm-ui Docker image'
                sh 'docker build . -t jonathonclifford/mm-ui -f ./apps/medical-models/Dockerfile'
                echo '------ Login to Docker Hub'
                sh 'echo "$DOCKER_CREDENTIALS_PSW" | docker login -u "$DOCKER_CREDENTIALS_USR" --password-stdin'
                echo '------ Push mm-ui image to Docker Hub'
                sh 'docker push jonathonclifford/mm-ui'
            }
        }
        stage('Checkout medical-models-k8s') {
            steps {
                echo '------ Checking out kubernetes config repo - medical-models-k8s ------'
                checkout scmGit(
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[
                        credentialsId: 'gitea-jenkins-user-and-pass',
                        url: 'http://gitea.busybunyip.com/medical-models/medical-models-k8s.git'
                    ]]
                )
            }
        }
        stage('Deploy to Prod') {
            steps {
                echo '------ kubectl version ------'
                sh 'kubectl version --client'
                echo '------ Delete current mm-ui deployment ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG delete deployment deployment-mm-ui --ignore-not-found'
                echo '------ Deploy new version of mm-ui ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG apply -f mm-models.yaml'
            }
        }
    }
}


