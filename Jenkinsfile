pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "abiwarshini/frontend-app"
        BACKEND_IMAGE  = "abiwarshini/backend-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Code pulled from GitHub"
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat "docker build -t %FRONTEND_IMAGE%:latest ./frontend"
            }
        }

        stage('Build Backend Image') {
            steps {
                bat "docker build -t %BACKEND_IMAGE%:latest ./backend"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-cred', variable: 'PASS')]) {
                    bat "echo %PASS% | docker login -u abiwarshini --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    retry(3) {
                        bat "docker push %FRONTEND_IMAGE%:latest"
                        bat "docker push %BACKEND_IMAGE%:latest"
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat "docker-compose up -d"
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESS 🎉"
        }
        failure {
            echo "Pipeline FAILED ❌ Check logs"
        }
    }
}
