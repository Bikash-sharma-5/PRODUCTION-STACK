# 🚀 Production-Grade 3-Tier AWS Deployment

[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)

A highly secure, scalable, and resilient 3-tier cloud architecture deployed on AWS. This project showcases the integration of global content delivery, automated load balancing, and private-network backend services managed with PM2.

---

## 🌍 Cloud Architecture Design
This deployment is architected across multiple subnets within the **ap-south-1 (Mumbai)** region to ensure high security and clean traffic flow.



### 🔄 End-to-End Traffic Flow
1. **Entry Point:** Users connect via **HTTPS** through **CloudFront**.
2. **Static vs. Dynamic:** CloudFront routes static asset requests to **S3** and API calls (`/api/*`) to the **Application Load Balancer (ALB)**.
3. **Public-to-Private Bridge:** The ALB (in a Public Subnet) receives traffic and forwards it to the **Node.js Backend** sitting in a **Private Subnet**.
4. **Outbound Access:** The Private EC2 instance communicates with the internet (for updates/logs) via a **NAT Gateway** connected to an **Internet Gateway (IGW)**.
5. **Data Persistence:** The backend connects to an **RDS MySQL** instance, isolated in a dedicated Private Database Subnet.

---

## 🛠️ Infrastructure & Process Management

### **VPC Networking Configuration**
| Component | Subnet Type | Role |
| :--- | :--- | :--- |
| **Internet Gateway** | VPC Level | Provides internet access to the VPC. |
| **NAT Gateway** | Public | Allows Private EC2 instances to download updates securely. |
| **Load Balancer** | Public | Entry point for traffic; mapped across Availability Zones (e.g., ap-south-1b).
| **EC2 Backend** | Private | Hosts the Node.js API; hidden from direct public access.
| **RDS Database** | Private | Stores persistent data; accessible only via Backend SG on Port 3306.

### **Backend Resilience with PM2**
To ensure the application remains online 24/7, I implemented **PM2** for process management:
- **Auto-Restart:** Automatically restarts the server if the application crashes.
- **Log Management:** Centralized monitoring of `stdout` and `stderr` for production debugging.
- **Process Persistence:** Configured to restart the Node.js application automatically upon EC2 reboot.

---



## 🔒 Security & Troubleshooting Lessons

This project involved solving complex networking challenges:
- **Health Check Optimization:** Fixed "Unhealthy" target status by aligning **Security Group** rules to allow Port 3000 from the ALB-SG.
- **Interface Binding:** Configured the Node.js server to listen on `0.0.0.0` to bridge the communication from the ALB to the Private EC2.
- **Proxy Headers:** Resolved "Mixed Content" errors by implementing CloudFront as a secure proxy for backend API calls.
- **Database Schema Sync:** Corrected silent insertion failures by aligning frontend payloads with MySQL `NOT NULL` constraints.

---


## 👨‍💻 Author
**Bikash Sharma** *Cloud & Backend Developer* Army Institute of Technology, Pune  

---
## 🏗️ Architecture Design
```mermaid
graph TD
    User((🌍 User)) -->|HTTPS| CF[CloudFront CDN]
    CF -->|Static Assets| S3[S3 Frontend]
    CF -->|/api/* Proxy| ALB[Application Load Balancer]
    
    subgraph VPC [VPC: 10.0.0.0/16]
        subgraph Public_Subnet [Public Subnet]
            ALB
            NAT[NAT Gateway]
        end
        
        subgraph Private_App_Subnet [Private Application Subnet]
            EC2[EC2 Backend - PM2 Managed]
        end
        
        subgraph Private_DB_Subnet [Private Database Subnet]
            RDS[(RDS MySQL)]
        end
    end

    ALB -->|Port 3000| EC2
    EC2 -->|Port 3306| RDS
    EC2 -->|Outbound| NAT
    NAT --> IGW[Internet Gateway]
    IGW -->|Updates/Logs| User
    NAT --> IGW[Internet Gateway]
    IGW -->|Updates/Logs| User
