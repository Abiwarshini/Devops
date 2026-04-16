pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "yourdockerhubusername/frontend-app"
        BACKEND_IMAGE = "yourdockerhubusername/backend-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/Abiwarshini/Event-Booking-System.git'
            }
        }

        stage('Build Images') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./frontend")
                    docker.build("${BACKEND_IMAGE}:latest", "./backend")
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                        docker.image("${BACKEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
