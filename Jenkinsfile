pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDS = 'docker-hub-creds'  // Docker Hub credentials ID in Jenkins
        DOCKER_HUB_USER = 'ashu20150'          // Docker Hub username
        CHANGED_SERVICES = ''                   // Will hold comma-separated changed services
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def changeLogSets = currentBuild.changeSets
                    def services = [] as Set

                    for (changeSet in changeLogSets) {
                        for (entry in changeSet.items) {
                            for (file in entry.affectedFiles) {
                                if (file.path.startsWith('ui-service/')) {
                                    services << 'ui-service'
                                }
                                if (file.path.startsWith('microservice1/')) {
                                    services << 'microservice1'
                                }
                                if (file.path.startsWith('microservice2/')) {
                                    services << 'microservice2'
                                }
                            }
                        }
                    }

                    if (services.isEmpty()) {
                        echo "No relevant changes detected."
                        currentBuild.result = 'SUCCESS'
                        // Set env.CHANGED_SERVICES empty to skip build stage
                        env.CHANGED_SERVICES = ''
                        return
                    }

                    // Save changed services as comma-separated string in env variable
                    env.CHANGED_SERVICES = services.join(',')

                    echo "Changed services: ${env.CHANGED_SERVICES}"
                }
            }
        }

        stage('Build & Push Docker Images') {
            when {
                expression { return env.CHANGED_SERVICES?.trim() }
            }
            steps {
                script {
                    def services = env.CHANGED_SERVICES.split(',')

                    for (service in services) {
                        def imageName = "${DOCKER_HUB_USER}/${service}"
                        def servicePath = "./${service}"

                        echo "Building Docker image for ${service}..."

                        sh "docker build -t ${imageName}:latest ${servicePath}"

                        withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh """
                                echo \$PASSWORD | docker login -u \$USERNAME --password-stdin
                                docker push ${imageName}:latest
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
