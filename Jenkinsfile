
pipeline {
    agent {
        agent any
    }

    stages {

        stage("Checkout") {
            steps {
                echo "Checking out the code"
                checkout scm
            }
        }

        stage("Build and Deploy") {
            steps {
                echo "Building Docker image and deploying application"

                sh '''
                    pwd
                    docker compose up -d --build
                    docker compose ps
                '''
            }
        }

        stage("Testing Deployment") {
            steps {
                echo "Checking deployment status"

                sh '''
                    docker compose ps

                    docker logs --tail 30 devops_project

                    # Check application HTTP response
                    curl -f http://localhost:80/ || exit 1
                '''
            }
        }

        stage("Push Image"){
            steps{
                sh '''
                docker tag devops_project:latest 427304877638.dkr.ecr.ap-south-1.amazonaws.com/devops-project:latest 
                docker push 427304877638.dkr.ecr.ap-south-1.amazonaws.com/devops-project:latest 
                '''
            }
        }
    }

    post {
        success {
            echo "The project is successfully deployed!"
        }

        failure {
            echo "Deployment failed! Check Jenkins console output."
        }
    }
}
