pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDS = 'docker-hub-creds'  // This is same name which we gave while creating pipeline on jenkins for storing docker creds
        DOCKER_HUB_USER = 'ashu20150'  // user name of docker
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
                    changedServices = [] as Set

                    for (changeSet in changeLogSets) {
                        for (entry in changeSet.items) {
                            for (file in entry.affectedFiles) {
                                if (file.path.startsWith('ui-service/')) {
                                    changedServices << 'ui-service'
                                }
                                if (file.path.startsWith('microservice1/')) {
                                    changedServices << 'microservice1'
                                }
                                if (file.path.startsWith('microservice2/')) {
                                    changedServices << 'microservice2'
                                }
                            }
                        }
                    }

                    if (changedServices.isEmpty()) {
                        echo "No relevant changes detected."
                        currentBuild.result = 'SUCCESS'
                        return
                    }

                    echo "Changed services: ${changedServices}"
                }
            }
        }

        stage('Build & Push Docker Images') {
            when {
                expression { return changedServices }
            }
            steps {
                script {
                    changedServices.each { service ->
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
