pipeline {
    agent any
    tool {
        nodejs "NodeJS 20.11.0"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
                checkout scm
            }
        }

        stage('Install Package') {
            steps {
                echo 'Install Yarn'
                sh 'npm install -g yarn'
                echo 'Install packages'
                sh 'yarn install'
            }
        }

        stages('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stages('E2E Test') {
            environment {
                ENV_CONFIG = credentials('env_config')
            }
            steps {
                sh 'rm -rf .env'
                sh 'cp ${ENV_CONFIG} .env'
                sh 'yarn run test:e2e'
            }
        }

        // stage('SonarQube analysis') {
        //     environment {
        //         SCANNER_HOME = tool 'sonar1'
        //     }
        //     steps {
        //         withSonarQubeEnv(credentialsId: 'sonar-token', installationName: 'sonarqube1') {
        //             sh '''$SCANNER_HOME/bin/sonar-scanner \
        //             -Dsonar.projectKey=TLBE \
        //             -Dsonar.projectName=TLockerBE \
        //             -Dsonar.sources=src \
        //             -Dsonar.exclusions=node_modules/*. \
        //             -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info'''
        //         }
        //     }
        // }

        stage('Deploy') {
            environment {
                SERVER_HOST = credentials("server_host")
                SERVER_USER_NAME = credentials("server_username")
                ENV_CONFIG = credentials('env_config')
            }
            steps {
                sshagent(credentials: ["ssh_private_key"]) {
                    sh """
                        [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                        ssh-keyscan -t rsa,dsa  ${SERVER_HOST} >> ~/.ssh/known_hosts
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "rm -rf /home/ubuntu/code/be/dist/*"
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "rm -rf /home/ubuntu/code/be/package.json"
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "rm -rf /home/ubuntu/code/be/ecosystem.config.js"
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "rm -rf /home/ubuntu/code/be/.env"
                        scp -o StrictHostKeyChecking=no -r ./dist/* ${SERVER_USER_NAME}@${SERVER_HOST}:/home/ubuntu/code/be/dist/
                        scp -o StrictHostKeyChecking=no -r package.json ${SERVER_USER_NAME}@${SERVER_HOST}:/home/ubuntu/code/be/
                        scp -o StrictHostKeyChecking=no -r ${ENV_CONFIG} ${SERVER_USER_NAME}@${SERVER_HOST}:/home/ubuntu/code/be/
                        scp -o StrictHostKeyChecking=no -r ecosystem.config.js ${SERVER_USER_NAME}@${SERVER_HOST}:/home/ubuntu/code/be/
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "cd /home/ubuntu/code/be/ && pnpm install"
                        ssh ${SERVER_USER_NAME}@${SERVER_HOST} "cd /home/ubuntu/code/be/ && pm2 restart ecosystem.config.js"
                    """
                }
            }
        }
    }
}