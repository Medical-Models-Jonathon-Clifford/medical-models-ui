pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerHubCredentials')
        MY_KUBECONFIG = credentials('kubeConfigFile')
        GIT_CREDS = credentials('gitea-jenkins-user-and-pass')
    }
    stages {
        stage('Checkout medical-models-ui') {
            steps {
                echo '------ Configuring Git to use credentials ------'
                sh '''
                    git config credential.helper store
                    echo "http://$GIT_CREDS_USR:$GIT_CREDS_PSW@gitea.busybunyip.com" > ~/.git-credentials
                    echo "http://$GIT_CREDS_USR:$GIT_CREDS_PSW@192.168.20.102" > ~/.git-credentials
                '''
                echo '------ Fetching all branches -------'
                sh 'git fetch --all'
                sh 'git fetch origin main:main'
            }
        }
        stage('Print Versions') {
            steps {
                echo '------ Node Version ------'
                sh 'node -v'
                echo '------ NPM Version -------'
                sh 'npm -v'
                echo '------ Nx Version -------'
                sh 'nx --version'
                echo '------ Java Version -------'
                sh 'java -version'
                echo '------ Linux Distro/Version -------'
                sh 'cat /etc/os-release'
                echo '------ kubectl version ------'
                sh 'kubectl version --client'
            }
        }
        stage('Install dependencies with caching') {
            steps {
                echo '------ Restore Cache: node_modules ------'
                cache(
                    maxCacheSize: 2048,
                    defaultBranch: 'main',
                    caches: [
                      arbitraryFileCache(path: 'node_modules', cacheValidityDecidingFile: 'package-lock.json')
                    ]
                ) {
                    script {
                        // Check if node_modules exists and is populated
                        def cacheRestored = sh(script: "test -d node_modules && find node_modules -mindepth 1 | read", returnStatus: true) == 0
                        if (cacheRestored) {
                            echo 'Cache restored successfully. Skipping npm ci.'
                        } else {
                            echo 'No valid cache found. Running npm ci.'
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        stage('Build and Push to Docker Hub - mm-ui, samd-production-ui - Main') {
            when {
                branch 'main'
            }
            steps {
                echo '------ Login to Gitea Container Registry ------'
                sh 'echo "$GIT_CREDS_PSW" | docker login gitea.busybunyip.com -u "$GIT_CREDS_USR" --password-stdin'
                echo '------ Build Affected ------'
                sh 'nx affected --base=HEAD~1 --target dockerbuild'
                retry(3) {
                    echo '------ Push Affected ------'
                    sh 'nx affected --base=HEAD~1 --target dockerpush'
                }
            }
        }
        stage('Build and Push to Docker Hub - mm-ui, samd-production-ui - Branch/PR') {
            when {
                not { branch 'main' }
            }
            steps {
                echo '------ Login to Gitea Container Registry ------'
                sh 'echo "$GIT_CREDS_PSW" | docker login gitea.busybunyip.com -u "$GIT_CREDS_USR" --password-stdin'
                echo '------ Find merge-base between this branch and main ------'
                script {
                    def mergeBase = sh(
                        script: "git merge-base HEAD main",
                        returnStdout: true
                    ).trim()
                    def head = sh(
                        script: "git rev-parse HEAD",
                        returnStdout: true
                    ).trim()
                    echo "Merge-base commit: ${mergeBase}"
                    echo "HEAD commit: ${head}"
                    echo '------ Build Affected ------'
                    sh "nx affected --base ${mergeBase} --target dockerbuild"
                    retry(3) {
                        echo '------ Push Affected ------'
                        sh "nx affected --base ${mergeBase} --target dockerpush --parallel=false"
                    }
                }
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
        stage('Deploy to Prod - mm-ui, samd-production-ui') {
            steps {
//              Not ideal since we are deleting and deploying every ui every time regardless of which has changed
                echo '------ Delete current mm-ui deployment ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG delete deployment deployment-mm-ui --ignore-not-found'
                echo '------ Delete current samd-production-ui deployment ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG delete deployment deployment-samd-production-ui --ignore-not-found'
                echo '------ Deploy new version of mm-ui ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG apply -f apps/mm-ui.yaml'
                echo '------ Deploy new version of samd-production-ui ------'
                sh 'kubectl --kubeconfig $MY_KUBECONFIG apply -f apps/samd-production-ui.yaml'
            }
        }
    }
}
