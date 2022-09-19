
# Hello World App

This is a short guide on setting up the system and environment dependencies
required for Hello World App with Mongo Database.

APP GitRepo: [https://github.com/gentitope/hello-world-app.git](https://github.com/gentitope/hello-world-app.git)

#### **Mission**

To create an application to run on AWS, which upon receiving a HTTP GET /
request will connect to a database, fetch a “Hello World” string from it and return it as a reply to
the requester. This application needs to support two distinct infrastructure environments: dev and
prod.


# Running the Application

### How To Build Infra and Deploy Hello World App

#### Pre-requisite
* Kubectl Command
* Eksctl Command
* Infra Directory contains eks cluster create config file and k8s mongodb manifest files
* Deploy Directory contains k8s manifest files for dev and prod with Dockerfile


Run the following command to setup the environment
```
export AWS_PROFILE=<add aws profile name>
cd infra/eks
eksctl create cluster -f eks-cluster.yaml
```
**Note: Creating eks cluster might take sometimes to be ready, Once the its ready then proceed with the following commands

Run the following command to create mongodb in the cluster

**For dev env
```
cd infra/mongodb/dev
kubectl create namespace dev
kubectl apply -f .
kubectl get pod -n dev
```
**For prod env
```
cd infra/mongodb/prod
kubectl create namespace prod
kubectl apply -f .
kubectl get pod -n prod
```
Run the following command to import mongodb collection

**For dev env
```
kubectl cp greetings.json dev/mongodb-0:/data
kubectl -n dev exec mongodb-0 -- mongoimport --username root --password adminpassword --authenticationDatabase admin --db hello_world --collection greetings --file /data/greetings.json --jsonArray
```

Run the following command to import mongodb collection

**For prod env
```
kubectl cp greetings.json prod/mongodb-0:/data
kubectl -n prod exec mongodb-0 -- mongoimport --username root --password adminpassword --authenticationDatabase admin --db hello_world --collection greetings --file /data/greetings.json --jsonArray
```

CICD

The cicd uses github action workflow pipelines to build and deploy to EKS Cluster

** Actions To Be Taken:
  * Configure Repo Actions [secrets](https://github.com/gentitope/hello-world-app/settings/secrets/actions) for the follow variables: 
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - DOCKERHUB_TOKEN
    - DOCKERHUB_USERNAME
  * Developer pushes
  * Docker Image build and push to Docker registry
  * Kubectl apply k8s deployment manifest files

To Test that it is running

**For dev env

```
kubectl get pod -n dev
kubectl get svc -n dev
kubectl port-forward service/hello-world-app 5005:80 -n dev
```

**For prod env
```
kubectl get pod -n prod
kubectl get svc -n prod
kubectl port-forward service/hello-world-app 5005:80 -n prod
```

Point to the browser

[http://127.0.0.1:5005/greetings](http://127.0.0.1:5005/greetings)

Cleanup EKS Cluster

```
export AWS_PROFILE=<add aws profile name>
eksctl delete cluster -f eks-cluster.yaml
```