pipeline{
    agent{
        label "agent23"
    }

    stages{
        stage("checkout"){
            steps{
                echo "Checking out the code"
                checkout scm
            }
        }
        stage("build"){
            steps{
                sh "pwd"
                echo "building the image"
                sh '''
                docker build -t project:v1 .
                docker tag project:v1 project:latest
                '''
            }
        }
        stage("Testing build"){
            steps{
                sh '''
                docker ps -a
                docker inspect project:latest
                '''
            }
        }
        stage("Deploy"){
            steps{
                echo "In the deployment process"
            sh '''
            docker stop devops_project || true
            docker rm devops_project || true 

            docker run -d \
            --name devops_project \
            --restart unless-stopped \
            -p 80:80 \
            project:latest 
            '''
            }
        }
        stage("Testing deployment"){
            steps{
                sh '''
                docker ps 
                docker logs --tail 30 devops_project
                '''
            }
        }
    }
    post{
            success {
                echo "The pproject is deployed"
            }
            failure{
                echo "Deployment failed!"
            }
        }
}