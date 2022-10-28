
# Hello World App

This is a short guide on setting up the system and environment dependencies
required for Hello World App with Mongo Database.

APP GitRepo: [https://github.com/gentitope/hello-world-app.git](https://github.com/gentitope/hello-world-app.git)

#### **Mission**

To create an application to run on AWS, which upon receiving a HTTP GET /
request will connect to a database, fetch a “Hello World” string from it and return it as a reply to
the requester. This application needs to support two distinct infrastructure environments: demo and
prod.


# Running the Application

### How To Build Infra and Deploy Hello World App

#### Pre-requisite
* Kubectl Command
* Eksctl Command
* Infra Directory contains eks cluster create config file and k8s mongodb manifest files
* Deploy Directory contains k8s manifest files for demo with Dockerfile


Run the following command to setup the environment
```
export AWS_PROFILE=<add aws profile name>
cd infra/eks
eksctl create cluster -f eks-cluster.yaml
```
**Note: Creating eks cluster might take sometimes to be ready, Once the its ready then proceed with the following commands

Run the following command to create mongodb in the cluster

**For demo env
```
cd infra/mongodb/demo
kubectl create namespace demo
kubectl apply -f .
kubectl get pod -n demo
```

Run the following command to import mongodb collection

**For demo env
```
kubectl cp greetings.json demo/mongodb-0:/data
kubectl -n demo exec mongodb-0 -- mongoimport --username root --password adminpassword --authenticationDatabase admin --db hello_world --collection greetings --file /data/greetings.json --jsonArray
```

Run the following command to import mongodb collection


CICD

- GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows to automate build, test and deploy.

The cicd uses github action workflow pipelines to build and deploy to EKS Cluster

** Actions To Be Taken:
  * Configure Repo Actions [secrets](https://github.com/gentitope/hello-world-app/settings/secrets/actions) for the follow variables: 
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - DOCKERHUB_TOKEN
    - DOCKERHUB_USERNAME
  * developer pushes
  * Docker Image build and push to Docker registry
  * Kubectl apply k8s deployment manifest files

To Test that it is running

**For demo env

```
kubectl get pod -n demo
kubectl get svc -n demo
kubectl port-forward service/hello-world-app 5005:80 -n demo
```

Point to the browser

[http://127.0.0.1:5005/greetings](http://127.0.0.1:5005/greetings)

Cleanup EKS Cluster

```
export AWS_PROFILE=<add aws profile name>
eksctl delete cluster -f eks-cluster.yaml
```