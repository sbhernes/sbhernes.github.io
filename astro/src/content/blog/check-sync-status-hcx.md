---
title: "Check HCX sync"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "check-sync-status-hcx"
cover: "/assets/images/9fad524e130c317b.png"
draft: false
---

# Check HCX sync

#### Have you used HCX before? and some of the migrations are stuck at "switching over"

#### During a project involving the migration of virtual machines, I observed that some migrations were significantly slower than others. A few VMs remained stuck in the "switching over" phase for hours. Unfortunately, there wasn't much troubleshooting that could be done directly within HCX to address the issue.

<figure>
<img src="/assets/images/9fad524e130c317b.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/c2a47cef4f39fe51.png" loading="lazy" />
</figure>

To investigate the replication state of a VM, you can log in to the ESXi host and follow these steps. This guide explains how to check the replication state through the ESXi host.

**Establish an SSH Session:**  
Start by initiating an SSH session to the ESXi host where the virtual machine is running.

**Identify the VM ID:**  
Use the following command to list all running virtual machines and their IDs:

vim-cmd vmsvc/getallvms  

Review the output and locate the VM ID for the virtual machine you want to investigate.  
  
**Check the Replication State:**  
Run this command, replacing 123 with the VM ID you identified:

vim-cmd hbrsvc/vmreplica.queryReplicationState 123  

The command will display the replication state of the VM. If replication is active, you will see the current data replication status. If it is idle, it may appear as shown in the accompanying screenshot.  

**Handle an Idle Replication State:**  
In cases where the replication state remains idle for an extended period, you may need to terminate the process and attempt the migration again. Use the following command to stop the offline replication instance, replacing 123 with the VM ID:

vim-cmd hbrsvc/vmreplica.stopOfflineInstance 123

By following these steps, you can assess and manage the VM's replication state effectively. In our scenario, the replication state was idle for several hours, so we stopped the process and retried the migration successfully.

<figure>
<img src="/assets/images/75bee48ad24db410.png" loading="lazy" />
</figure>
