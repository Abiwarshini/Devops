pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "yourdockerhubusername/frontend-app"
        BACKEND_IMAGE = "yourdockerhubusername/backend-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Jenkins will automatically pull from GitHub SCM
                echo "Code already checked out by Jenkins"
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./frontend")
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
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

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
