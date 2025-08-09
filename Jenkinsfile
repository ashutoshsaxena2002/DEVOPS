def changedServices = [] // Global variable to persist between stages
pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDS = 'docker-hub-creds'  // Docker Hub credentials ID in Jenkins
        DOCKER_HUB_USER = 'ashu20150'          // Docker Hub username
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

                    echo "Services Tracking Started++++++++++++++++++++++++++++++++++++++++++++";

                    for (changeSet in changeLogSets) {
                        for (entry in changeSet.items) {
                            for (file in entry.affectedFiles) {
                                if (file.path.startsWith('uiservice/')) {
                                    services << 'uiservice'
                                     echo "Services Tracking Started : ui service changed++++++++++++++++++++++++++++++++++++++++++++";
                                }
                                if (file.path.startsWith('Microservice1/')) {
                                    services << 'Microservice1'
                                    echo "Services Tracking Started : Microservice1 changed++++++++++++++++++++++++++++++++++++++++++++";
                                }
                                if (file.path.startsWith('Microservice2/')) {
                                    services << 'Microservice2'
                                    echo "Services Tracking Started : Microservice2 changed ++++++++++++++++++++++++++++++++++++++++++++";
                                }
                            }
                        }
                    }

                    echo "Services Tracking Started end. services : ${services} CHANGED_SERVICES: ${changedServices}  ++++++++++++++++++++++++++++++++++++++++++++";

                    if (services.isEmpty()) {
                        echo "No relevant changes detected."
                        currentBuild.result = 'SUCCESS'
                        changedServices = ''
                        return
                    }
                   echo "Before Setting value to changed services. services : ${services} CHANGED_SERVICES: ${changedServices}  ++++++++++++++++++++++++++++++++++++++++++++";
                   changedServices= services as List;
                   echo "After Setting value to changed services. services : ${services} CHANGED_SERVICES: ${changedServices}  ++++++++++++++++++++++++++++++++++++++++++++";
                   echo "Changed services: ${changedServices}"
                }
            }
        }

        stage('Build & Push Docker Images') {
            when {
                expression {
                    return changedServices && !changedServices.isEmpty()
                }
            }
            steps {
                script {
                    def services = changedServices
                    echo "Inside docker stage changedServices : ${services}"

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
