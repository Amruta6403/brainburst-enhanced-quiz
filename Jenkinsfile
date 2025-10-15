pipeline {
  agent any
  environment {
    DOCKERHUB = 'YOUR_DOCKERHUB_USERNAME'
    IMAGE = "${env.DOCKERHUB}/brainburst"
    VERSION = "1.0.${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build') { steps { sh "docker build -t ${IMAGE}:${VERSION} ." } }
    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push ${IMAGE}:${VERSION}"
        }
      }
    }
    stage('Deploy') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
          sh 'export KUBECONFIG=$KUBECONFIG_FILE'
          sh "kubectl -n brainburst set image deployment/brainburst-deployment brainburst=${IMAGE}:${VERSION} || kubectl -n brainburst apply -f k8s/deployment.yaml"
        }
      }
    }
  }
}
