---
title: "VMware Cloud Foundation - Platform to build and manage cloud infrastructure."
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "vcf"
cover: "/assets/images/da00a52936af24b4.png"
draft: false
---

# **VCF - Building a Unified, Secure, and Scalable Hybrid Cloud Infrastructure.**   **This post is divided into three chapters:**** 1.** **An overview of VCF**** 2.** **How to deploy VCF**** 3.** **Migrating to a VCF environment using HCX**

# VMware Cloud Foundation - *Platform to build and manage cloud infrastructure.*

VMware Cloud Foundation (VCF) represents a unified platform for managing hybrid cloud environments, designed to simplify the deployment and management of a modern, multi-cloud infrastructure. In this article, we explore the technical details of VCF, its architecture, core components, deployment models, migration into VCF, and the benefits it offers for enterprises transitioning to cloud-native solutions.

1. Introduction

Modern enterprises face increasing complexity when managing diverse workloads across multiple cloud environments. VMware Cloud Foundation addresses these challenges by integrating compute, storage, networking, and management into a single platform. By leveraging a software-defined data center (SDDC) approach, VCF allows organizations to deploy, operate, and manage applications consistently, whether on:  
  
**on-premise** infrastructure, (e.g., Dell VxRail, HPE, Lenovo, etc.)  
**Public cloud** (VMware Cloud on AWS, Azure VMware Solution, Google Cloud VMware Engine)  
**Hybrid environments** (mix of on-prem and cloud)

2. Overview of VMware Cloud Foundation

VMware Cloud Foundation is more than just a collection of technologies; it is an integrated system that automates and standardizes SDDC operations. VCF brings together:

- vSphere for compute virtualization,

- vSAN for software-defined storage,

- NSX for network virtualization, and

- vRealize Suite for cloud management and automation.

These components work together to deliver a robust, scalable, and secure environment that supports a wide array of applications and workloads.  

VCF is setup with a management domain and workload domains.

The management domain is dedicated to running the infrastructure’s core services. This includes components such as:

- vSphere: The virtualization layer managing compute resources.

- vSAN: The default storage solution used here to ensure high-performance and resilient storage for management components.

- NSX: For software-defined networking, managing connectivity and security.

- vRealize Suite & SDDC Manager: For monitoring, automation, lifecycle management, and operations of the entire stack.

<!-- -->

- Characteristics:

  - Isolation: This domain is isolated from workload domains to ensure that the infrastructure’s control plane remains stable and secure.

  - Performance & Reliability: Using vSAN in the management domain provides a highly available and resilient storage layer critical for the consistent performance of management applications.

  
Workload domains are used for running your customer or application workloads. They are essentially clusters where production applications run.

- **Storage Options:**

  - **vSAN:** Like the management domain, workload domains can also use vSAN, offering a hyper-converged storage solution with the benefits of simplified management and integrated performance.

  - **Alternate Storage Technologies:**  
    Workload domains can also be configured to use other storage solutions (such as third-party SAN arrays or software-defined storage solutions) depending on the specific requirements of the applications, performance needs, or cost considerations.

- **Characteristics:**

  - **Flexibility:** The choice of storage in a workload domain can be tailored, providing the ability to use different storage technologies as needed.

  - **Scalability:** Workload domains can be scaled independently from the management domain, allowing for growth or adjustments to meet changing workload demands.

  - **Isolation from Management:** Keeping workload domains separate helps ensure that heavy or unpredictable workload activity does not interfere with the stability of the management plane.

3. Architecture and Core Components

3.1 SDDC Backbone

At the heart of VCF is the idea of a Software-Defined Data Center (SDDC). This approach transforms physical hardware—like servers, storage, and networking—into flexible, virtual resources that are easy to manage from a single platform. The SDDC model offers:

- **Automation:** Built-in workflows and lifecycle management tools make it easy to deploy and update infrastructure quickly.

- **Policy-Driven Management:** You can control how resources are used, enforce security policies, and manage network settings—all from a central location.

3.2 Compute Virtualization: VMware vSphere

vSphere acts as the virtualization layer, providing the foundation for creating, running, and managing virtual machines. It offers a robust set of features designed to optimize performance, availability, and resource utilization:

- **High Availability (HA):** Minimizes downtime by automatically restarting VMs on available hosts in the event of a hardware failure.

- **vMotion:** Enables live migration of running VMs between hosts with zero service interruption, facilitating load balancing and maintenance.

- **Resource Management:** Dynamically allocates CPU and memory resources based on workload demands, ensuring efficient performance across the environment.  
    

3.3 Storage Virtualization: VMware vSAN

vSAN integrates directly with vSphere to pool storage resources from multiple hosts, offering a streamlined solution for the management domain. This is only a requirement for the management domain — for the workload domain, you can use other supported storage technologies such as vSAN, VMFS on FC/iSCSI, NFS, vVols, or even cloud-based storage depending on your environment and compatibility.  
  

3.4 Network Virtualization: VMware NSX

NSX revolutionizes networking by abstracting the network layer from the underlying hardware, enabling:

- Micro-segmentation: Fine-grained security controls within and across workloads.

- Automation: Rapid deployment of virtual networks with consistent policies.  

4. Benefits of VMware Cloud Foundation

Why should you consider using VCF.

4.1 Simplified Operations and Automation

VCF automates routine tasks such as patching, lifecycle management, and resource provisioning. This reduces operational overhead and accelerates time-to-deployment.

4.2 Enhanced Security and Compliance

With integrated security features from NSX and policy-based management, VCF enables robust security postures that comply with regulatory requirements. Micro-segmentation ensures that breaches are contained to limited network segments.

4.3 Scalability and Flexibility

Whether scaling up to accommodate enterprise workloads or scaling out to new cloud regions, VCF offers a flexible architecture that adjusts to evolving business needs. Its integration with public cloud providers ensures a smooth transition between environments.

4.4 Consistency Across Environments

By using a single management framework for both on-premises and cloud deployments, VCF delivers operational consistency, reducing the risk of misconfigurations and simplifying troubleshooting.

Conclusion

VMware Cloud Foundation (VCF) is a cornerstone for enterprises aiming for a unified, secure, and agile cloud infrastructure. By consolidating compute, storage, networking, and management into a single platform, VCF simplifies the challenges associated with hybrid cloud environments.

In our operations, we utilize both modern and legacy systems. Our VCF platform delivers numerous advantages as discussed earlier, yet some legacy systems remain too fragile and inflexible to operate within a VCF environment. These systems, which do not support vMotion and are too slow to accommodate new releases, hinder upgrade processes. Consequently, they are maintained in a traditional vCenter-ESXi setup, while the majority of our systems benefit from the VCF environment.

Although setting up VCF can appear challenging initially, there is a wealth of hands-on labs and instructional videos available that facilitate the learning process. In the long term, the operational efficiencies and scalability provided by VCF often justify the investment. Furthermore, VCF continues to be a priority for VMware, which is expected to introduce new features and integrations to further enhance the platform.

<figure>
<img src="/assets/images/da00a52936af24b4.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/7c42dcd3f065049f.png" loading="lazy" />
</figure>

Posted 30.03 2025

<figure>
<img src="/assets/images/eca4add89d19ce60.png" loading="lazy" />
</figure>

### Source: [cloud13.ch](http://cloud13.ch) - VMware Cloud Foundation Overview (VCF 4.5)

**So, how to deploy it?**

Deploying VMware Cloud Foundation is remarkably straightforward, thanks to how well VMware has streamlined the entire process — plus, there are plenty of guides available online and hands-on labs to help you every step of the way.

Prerequisites – Before You Begin

Before jumping into deployment, here’s what you need:

Hardware Requirements:

- VMware-certified hardware (see the [VCF Compatibility Guide](https://www.vmware.com/resources/compatibility/search.php))

- Minimum 4 ESXi hosts

- BGP-capable TOR switches

Software

- VMware Cloud Foundation software bundle

- Cloud Builder Appliance – the tool used to bootstrap VCF

Planning

- Prepare a Management Domain Deployment Parameter Sheet

- DNS, NTP, VLANs, IP planning

- External services: Active Directory, syslog, etc.

Step 1: Rack, Stack, and Configure ESXi Hosts

- Install ESXi manually on each host (standalone), configure basic network and root password.

- Ensure hostnames, IPs, and DNS resolution are working.

Step 2: Prepare the Deployment Parameter Sheet

VCF requires a JSON-based configuration to tell Cloud Builder how to deploy your environment.

- VMware provides a spreadsheet (XLSX) that you fill out and convert into a JSON.

- Includes settings for:

  - Hostnames and IPs for management VMs

  - VLAN IDs

  - vSAN and vSphere networks

  - NSX Manager cluster

  - Passwords for all accounts

Step 3: Deploy the Cloud Builder Appliance

- Deploy the Cloud Builder OVA on a temporary ESXi host or existing environment.

- Power it on and access it via the web interface: [https://\<CloudBuilder-IP\>](https://%3cCloudBuilder-IP%3e)

- Upload your deployment file and validate the environment.

Step 4: Launch VCF Management Domain Deployment

- Click “Deploy” in the Cloud Builder UI.

- This will:

  - Deploy vCenter

  - Configure ESXi hosts into a cluster

  - Set up vSAN

  - Deploy and configure NSX Manager

  - Deploy SDDC Manager

- Deployment can take 1–2 hours depending on your hardware.

At the end, you'll have your Management Domain—the core of VCF.

Step 5: Log into SDDC Manager

- Navigate to [https://\<sddc-manager-ip\>](https://%3csddc-manager-ip%3e)

- Login with the credentials from your deployment sheet.

- From here, you can manage:

  - Workload Domains

  - Lifecycle (patches/updates)

  - Certificate management

  - Password rotation

  - Monitoring and alerts

Step 6: Create Workload Domains

With the management domain live, you can now deploy Workload Domains:

- These are additional clusters dedicated to apps or specific services.

- Use the SDDC Manager to create vSphere-based workload domains or VCF with Tanzu for Kubernetes workloads.

You’ll need additional ESXi hosts for each domain.

**Wrapping Up**

Deploying VCF isn’t a quick weekend project—but once it’s up and running, it gives you a robust, enterprise-grade hybrid cloud platform that’s fully software-defined and future-ready.

Whether you're consolidating your data center, preparing for cloud migration, or going full Kubernetes, VCF sets the foundation for it all.

**A great session I attended at vmware explorer was about migrating in to a VCF enviroment.**

VMware HCX is designed to simplify and accelerate large-scale workload migrations. It offers capabilities such as WAN optimization, network extension, and application mobility across data centers and clouds. In this blog post, we’ll walk through the essentials of migrating virtual workloads into a VMware Cloud Foundation environment using HCX, highlight its key features, and provide best practices for a smooth transition.

VMware HCX is an application mobility platform that enables business-critical workload migrations across private, public, and hybrid cloud environments. With HCX, you can:

- **Migrate workloads at scale** with minimal downtime.

- **Extend on-premises networks** into your VMware Cloud Foundation-based SDDC (Software-Defined Data Center) or other environments.

- **Optimize network traffic** via WAN optimization and data deduplication.

- **Replicate and protect** virtual machines (VMs) across sites for disaster recovery scenarios.

  
HCX eliminates much of the complexity of migrating to hybrid cloud infrastructures and significantly reduces the time and risk involved in such endeavors.

### **Deploy and Configure HCX**

In a typical deployment scenario, you will install an HCX Manager appliance in both your on-premises data center and in your target VMware Cloud Foundation environment. Key components include:

1.  **HCX Manager:** The main component that orchestrates migration, replication, and networking.

2.  **HCX Interconnect Appliance:** Handles the WAN optimization and traffic flow, facilitating migrations over extended distances.

3.  **HCX Network Extension Appliance (Optional):** Extends layer 2 networks to the target environment if you need seamless IP addressing for migrated workloads.

  
You’ll also need to create service mesh configurations that define the connection between your on-premises site and the VMware Cloud Foundation site. This involves pairing your source and destination HCX Managers, and deploying the necessary appliances to facilitate the data transfer and network extension.

One of HCX’s most powerful features is the ability to extend on-premises networks to your VMware Cloud Foundation environment. This allows you to keep the same IP addresses for your workloads, greatly reducing downtime and complexity.

- **Decide which VLANs or Port Groups** you need to stretch.

- **Determine the number of extended networks** required to maintain application connectivity.

- **Configure routing and firewall rules** so that your network traffic can flow unimpeded between on-premises and the VCF environment.

  
With the service mesh established and extended networks in place, you’re ready to start moving workloads.

**Common migration methods with HCX include:**

- **vMotion Migration (Zero Downtime):** Live migrations of VMs with no downtime. Ideal for critical applications that cannot be interrupted.

- **Replication-Assisted vMotion (RAV):** Uses replication to keep a VM synchronized in the background, then performs a quick switchover, minimizing downtime.

- **Bulk Migration:** Schedules and batches multiple VMs to migrate outside of peak business hours, allowing for efficient transfers with minimal disruptions.

- **Cold Migration:** VMs are powered off to reduce resource usage and ensure complete consistency, typically used for non-critical workloads or when downtime is acceptable.

Using VMware HCX, you can streamline the migration of workloads at scale, seamlessly extend networks, and maintain consistent security and operations across your platforms.  
  
Thank you for taking the time to read this post—I truly appreciate it!

<figure>
<img src="/assets/images/ee5c17e56a1c1c3e.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/88e24b86e7f86813.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/92f23a7038ea1546.png" loading="lazy" />
</figure>

### Picture showing the deployment file. Source: <https://tinyurl.com/vmware-cloudbuilder>

<figure>
<img src="/assets/images/5c767e908a668f03.png" loading="lazy" />
</figure>
