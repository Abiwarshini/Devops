pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "abiwarshini/frontend-app"
        BACKEND_IMAGE = "abiwarshini/backend-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Code already checked out by Jenkins"
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
                withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat "echo %PASS% | docker login -u %USER% --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                bat "docker push %FRONTEND_IMAGE%:latest"
                bat "docker push %BACKEND_IMAGE%:latest"
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat "docker-compose up -d"
            }
        }
    }
}
