---
title: "How to deploy Private AI foundations for vcf 9"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "deployment-of-paif"
cover: "/assets/images/f2ce09d4078c9c74.png"
draft: false
---

### How to deploy Private AI foundations for vcf 9

Posted: XXXXX

We are currently setting up Private AI Foundation (PAIF) in our VCF 9 environment. This guide walks through how we deployed PAIF in our setup.

VMware has already published a solid, step-by-step guide for deploying PAIF through vCenter, which we used as the foundation for our implementation.

To enable the guided deployment in the vSphere UI, you must first have a valid license. Start by adding the VMware Private AI Foundation with NVIDIA license in License Management.

Next, navigate to VCF Operations → License Management → Licenses → Version 9+ → vCenter System, and assign the PAIF-N add-on license.

Once the license is assigned, the guided setup becomes available in the vSphere UI.

<figure>
<img src="/assets/images/f2ce09d4078c9c74.png" loading="lazy" />
</figure>

### As shown in the guide above, these are the steps we need to complete. The process starts with creating a network pool.

### **STEP 1: Network Pool**

After clicking Start in the setup environment, the guided PAIF deployment workflow is displayed.

Below is an overview of the deployment steps:

<figure>
<img src="/assets/images/180960fb27b36e04.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/ca62476d6b94c3ce.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/0e101cbbaf7d3482.png" loading="lazy" />
</figure>

### First, we need to create network pools for vMotion and vSAN. Define an IP address range that will be used for vMotion and vSAN traffic.

### **STEP 2: Commission the ESXi hosts with NVIDIA GPUs**

<figure>
<img src="/assets/images/1c8e2f0ff99185e4.png" loading="lazy" />
</figure>

### Next, commission the hosts that will be used in the workload domain (WLD). Provide the FQDN, select the storage type, and assign the network pools created in the previous step.

Enter the required username and password, run the validation, and once it completes successfully, this step is finished.

### **STEP 3: Deploy a workload domain for Private AI Foundation**

### **General information:** Provide the name of the workload domain and define which SSO domain it should be associated with.

<figure>
<img src="/assets/images/93856ccc7685c0e9.png" loading="lazy" />
</figure>

### **vCenter:** Provide the FQDN of the vCenter. You can view the IP configuration by clicking the eye icon to the right of the input field.

<figure>
<img src="/assets/images/e69ef4513d287a50.png" loading="lazy" />
</figure>

### **Cluster:** Provide the FQDN of the vCenter. You can view the IP configuration by clicking the eye icon to the right of the input field.

<figure>
<img src="/assets/images/5c6a226723d092a1.png" loading="lazy" />
</figure>
