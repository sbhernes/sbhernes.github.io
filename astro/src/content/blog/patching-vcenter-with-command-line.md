---
title: "PATCHING VCENTER"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "patching-vcenter-with-command-line"
cover: "/assets/images/f253a97045e92ef5.png"
draft: false
---

# PATCHING VCENTER

#### There have been several security patches released for vCenter recently, and I’ve found that patching vCenter through the command line is a more efficient approach. This guide provides step-by-step instructions for applying vCenter patches using the command line.

#### The first step is to download the patch file from the VMware portal.

**Next**, upload the patch file to a datastore accessible by the vCenter server. You can accomplish this using the datastore browser within vCenter or by using a tool like WinSCP.

Finally, mount the ISO file to proceed with the patching process.

#### Log in to the vCenter server via SSH. To patch vCenter, you need to use the appliance shell. If your session starts in the Bash shell by default, refer to this Knowledge Base (KB) article for guidance: <u>[Changing between appliance shell and bash shell](/changing-between-appliance-shell-and-bash-shell)</u>

#### Then start staging the patch by running this command: software-packages stage --iso

#### Next, run the following command to verify the staged patch: software-packages list --staged

####  

#### Then finally run the install command: software-packages install --staged

####  Then run a reboot command: reboot  

After the reboot, the vCenter server should be successfully patched.

<figure>
<img src="/assets/images/f253a97045e92ef5.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/1dcf5ac3f925fa79.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/508742a952c93a14.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/91b25bdf832e3149.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/a8cf8540ebcd4173.png" loading="lazy" />
</figure>
