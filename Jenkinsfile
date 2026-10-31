
pipeline {
    agent {
        label "agent23"
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
