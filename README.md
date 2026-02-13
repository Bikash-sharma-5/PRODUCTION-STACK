# 🚀 Production-Grade 3-Tier AWS Deployment

[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

A secure, scalable, and production-ready 3-tier cloud architecture deployed on AWS. This project demonstrates a deep understanding of cloud networking, security, and full-stack integration.

---

## 🌍 Live Architecture Overview

This project utilizes a high-availability infrastructure where the database and backend are isolated from the public internet for maximum security.



### 🛠 Tech Stack
- **Frontend Hosting:** Amazon S3 & CloudFront (CDN)
- **Application Layer:** Amazon EC2 (Node.js/Express)
- **Process Management:** PM2
- **Database Layer:** Amazon RDS (MySQL)
- **Networking:** AWS VPC, Public/Private Subnets, NAT Gateway
- **Load Balancing:** Application Load Balancer (ALB)

---

## 🏗️ Architecture Design

```mermaid
graph TD
    User((🌍 Internet Users)) --> CF[CloudFront CDN]
    CF -->|Static Assets| S3[S3 Frontend]
    CF -->|/api/* Proxy| ALB[Application Load Balancer]
    ALB -->|Port 3000| EC2[EC2 Backend - Private Subnet]
    EC2 -->|Port 3306| RDS[(RDS MySQL - Private DB)]
