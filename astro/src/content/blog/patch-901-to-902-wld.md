---
title: "Patching WLD from 9.0.1 --> 9.0.2"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "patch-901-to-902-wld"
cover: "/assets/images/c3e30b4e7ce7fd53.png"
draft: false
---

# Patching WLD from 9.0.1 --\> 9.0.2

### POSTED 17.02.2026

This article is a follow-up to my previous post: <u>[patching mgmt](/patch-901-to-902-wld)</u>. In this guide, I’ll walk through how we approach upgrading Workload Domains in VCF 9  
The update sequence we follow is:

SDDC Manager  
NSX  
vCenter Server  
ESXi hosts  
vSAN

This update order is important, as it maintains compatibility between platform services and the underlying infrastructure components throughout the lifecycle process.

**Step 1 — Download the Upgrade Binaries**

Start by downloading all required binaries from Lifecycle Manager.  
Navigate to Lifecycle → VCF Instances, select the top-level VCF instance, then go to Binary Management → Upgrade Binaries.

From here, download version 9.0.2 for the following components:

- SDDC Manager

- NSX

- vCenter Server

- ESXi hosts  
    

Make sure all binaries are fully synchronized before proceeding to the next phase, as Lifecycle operations depend on these packages being available locally.

<figure>
<img src="/assets/images/c3e30b4e7ce7fd53.png" loading="lazy" />
</figure>

**Step 1 — Update SDDC Manager**

Now you’re ready to begin patching SDDC Manager.  
Navigate to Lifecycle → VCF Instances, select the top-level VCF instance, and you will see the available SDDC Manager updates.

Start by running a Precheck to verify that the environment is ready for the upgrade. This step validates dependencies, health status, and configuration requirements, and should always be completed before proceeding.

Once all checks pass and the system reports that it is ready, click Update Now to begin the upgrade process.

<figure>
<img src="/assets/images/37903fd1259bb95d.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/ddb5b82fc94d37c6.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/c0d0ed8e7014d1c4.png" loading="lazy" />
</figure>

During the upgrade process you may temporarily see alarms or error messages. This is expected, as SDDC Manager will reboot as part of the patching workflow. Give it a few minutes, once the services come back online, the alerts should clear automatically.

After the system is back up, verify that the patch has been successfully applied here:

<figure>
<img src="/assets/images/a437f07f46ef0768.png" loading="lazy" />
</figure>

**Step 2 — Run Prechecks**

Just like in the previous step, start by running Prechecks for the remaining core components before initiating any upgrades.

Navigate to **Fleet Management → Lifecycle → VCF Instances**, then select the **VCF environment** you plan to update. From here, run the precheck workflow to validate that all dependencies, health states, and configuration requirements are in place before proceeding with the lifecycle operations.

<figure>
<img src="/assets/images/3d5d57c878609966.png" loading="lazy" />
</figure>

**Step 2 — Update NSX**

Once the precheck completes without any errors, you’re ready to begin patching the first core component, NSX.

Navigate to **Fleet Management → Lifecycle → VCF Instances**, and select the VCF environment you want to upgrade. Under Updates, just below the precheck section, you’ll see the available upgrades along with the four-step workflow that tracks the upgrade progress.

Click Configure Update to begin. The process starts with the NSX Precheck, which gives you an overview of the upgrade workflow and validates that all prerequisites and environmental requirements are met before continuing with the upgrade.

<figure>
<img src="/assets/images/172ccc191b34b7d6.png" loading="lazy" />
</figure>

After selecting Configure Update, NSX will first run through a Precheck phase followed by the Upgrade Options step, where you review and confirm the upgrade settings before the process continues.

<figure>
<img src="/assets/images/a67b82c923faf320.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/84dd2c6a0653ab2b.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/91c478b64ee1069e.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/069a712a48673aed.png" loading="lazy" />
</figure>

The Precheck will now start automatically. This step can take some time to complete, so allow it to finish and avoid making any changes in the environment while the validation is running.

<figure>
<img src="/assets/images/1cef7ed13f51f30e.png" loading="lazy" />
</figure>

Next, you can start the NSX upgrade. Click Schedule Update to define when the upgrade should begin, allowing you to choose a suitable maintenance window before the process starts.

<figure>
<img src="/assets/images/72262ffbf8564479.png" loading="lazy" />
</figure>

The first page provides a review summary of what will be updated. After confirming the details, continue to the scheduling stage.

In this step, I selected Upgrade Now and confirmed that the precheck results had been reviewed before proceeding with the upgrade.

<figure>
<img src="/assets/images/05302e66e33ae294.png" loading="lazy" />
</figure>

You can monitor the upgrade status from this view as the process progresses.

<figure>
<img src="/assets/images/1b8d80de14f5174f.png" loading="lazy" />
</figure>

This is how the upgrade status appears during the process.

<figure>
<img src="/assets/images/26633003dad0ea2a.png" loading="lazy" />
</figure>

**Step 3 — vCenter**

Once the NSX upgrade is complete, you can continue with vCenter Server. The next step is to configure the vCenter update workflow. Click configure update to begin configuring the upgrade process.  
  
The first option is the upgrade mechanism, where you can choose methods that help reduce vCenter downtime during the upgrade. I chose the regular upgrade since this is a POC enviroment.

<figure>
<img src="/assets/images/1f38ce192a58d7f2.png" loading="lazy" />
</figure>

Next is the backup option. Always verify that a valid backup of the vCenter Server exists before proceeding. Check VAMI for successfull backup. After confirming this, click Next to continue.

<figure>
<img src="/assets/images/c6cda441ec784581.png" loading="lazy" />
</figure>

If you chose the option with reduced downtime, you have some more options here. If you’ve upgraded vCenter Server before, you’ll probably remember the need to provide a temporary static IP address for the migration phase. This IP was used by a temporary appliance that handled the configuration copy from the existing vCenter to the new one.

With VCF 9.0, this workflow is much simpler. The platform now assigns a temporary IP automatically during the upgrade, using a link-local network (169.254.0.0/16) that is established directly between the source and target vCenter VMs. This removes the need for manual IP planning and reduces the risk of configuration errors during the upgrade process.

<figure>
<img src="/assets/images/5fbbe05d6ddbca0e.png" loading="lazy" />
</figure>

Press next and monitor the upgrade

**Step 3 — ESX**

Once the vCenter upgrade is complete, proceed with the ESXi upgrade. The next step is to configure the ESXi update workflow, click Configure Update to begin the upgrade process.  
  
The first step is to create the image you want to use. If you want to create a custom iso or just a plane image. We created a custom iso and uploaded it in vcenter

<figure>
<img src="/assets/images/008ca5aae8cad921.png" loading="lazy" />
</figure>

After the image was successfully imported, I navigated back to the Management Domain to continue with the ESXi host upgrade.  
  
The next step is to configure the ESX update workflow. Click Configure update to begin configuring the upgrade process.

<figure>
<img src="/assets/images/5a7ffead8c40a978.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/6ffb042455791f4b.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/b60b475abc632fc1.png" loading="lazy" />
</figure>

Choose the clusters you want to update

Assign the image you uploaded in the previous step

<figure>
<img src="/assets/images/d511c7c02ef46a57.png" loading="lazy" />
</figure>

The Upgrade Options allow you to optimize how the upgrade is performed. You can enable Quick Boot to reduce host reboot time and choose to automatically migrate powered-off or suspended VMs when a host enters maintenance mode. By default, clusters are upgraded in parallel to help minimize the overall upgrade duration.

<figure>
<img src="/assets/images/0ede52ce75093895.png" loading="lazy" />
</figure>

After the precheck completed successfully, I moved on to scheduling the upgrade to start the ESXi host update process.

<figure>
<img src="/assets/images/cbd0b2a771c6f04c.png" loading="lazy" />
</figure>

Monitor the update process.

<figure>
<img src="/assets/images/48e9568d6e9a8135.png" loading="lazy" />
</figure>

**Step 5 — Supervisor**

In earlier versions of vSphere, Supervisor was bundled with vCenter Server and updated as part of the same lifecycle process. Starting with vSphere 9.0, Supervisor is delivered as a separate component. This allows administrators to install or upgrade Supervisor independently of vCenter, providing greater flexibility in lifecycle management and enabling quicker access to new features and security updates.

First you need to create a content library and subscribe to:  
<https://wp-content.vmware.com/supervisor/v1/latest/lib.json>  
  
<https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/vsphere-supervisor-installation-and-configuration/updating-vsphere-supervisor/updating-the-vsphere-with-tanzu-environment/create-a-supervisor-asynchrounious-releases-content-library.html>

Then assign that content library to the supervisor manegment

<figure>
<img src="/assets/images/f17a76f1a620f4b0.png" loading="lazy" />
</figure>

The next step is to check for available Supervisor updates. Navigate to the Updates section, where you can see if a newer Supervisor version is available. Select Apply Updates to initiate the Supervisor upgrade process.

<figure>
<img src="/assets/images/fa1b607c67288e85.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/b369e3b8eef7cc06.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/5f4d5c72712835c1.png" loading="lazy" />
</figure>

Select the content library newly created

<figure>
<img src="/assets/images/2aa74a21b11e9383.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/c4c4054477c8c18f.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/5906b6d0ccee7953.png" loading="lazy" />
</figure>

You can also choose between two **preparation options**:

- **Immediate** — the preparation phase begins as soon as the configuration is completed.

- **Scheduled** — lets you define a specific date and time for when the preparation phase should start

Since I selected the standard update method, my available options were limited to either starting the upgrade immediately or scheduling it for a later time.

<figure>
<img src="/assets/images/a8b02500ca547d9d.png" loading="lazy" />
</figure>

**Step 5 — review**

Upgrading from VCF 9.0.1 to 9.0.2 was a smooth and well-structured lifecycle process, with most of the work handled directly through SDDC Manager and Fleet Management. The workflow is very guided, starting with binary downloads, followed by prechecks, and then upgrading each core component in the correct order (SDDC Manager, NSX, vCenter, ESXi, and finally vSAN disk format).
