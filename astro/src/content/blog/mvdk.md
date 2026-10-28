---
title: "Got an MVMDK?"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "mvdk"
cover: "/assets/images/df44aa6b58a463a7.png"
draft: false
---

# Got an MVMDK?

#### We worked on a P2V (Physical-to-Virtual) migration project using StarWind to convert a physical machine into a virtual one. After completing the conversion, we noticed that the virtual machine's setup in the datastore folder appeared different when viewed in vCenter.

#### As mentioned earlier, the virtual machine's folder in the datastore had an unusual setup. It contained multiple disks in the MVMDK format, which caused HCX to refuse the migration. So, what is an MVMDK disk? It stands for Multi-Virtual Machine Disk, a format that can appear during a P2V migration when the physical machine has multiple disks or partitions.

#### To resolve this issue, I renamed the disks to the standard VMDK format. Once renamed, the setup returned to normal, allowing the migration process to proceed successfully. You need to reattach the disks.

<figure>
<img src="/assets/images/df44aa6b58a463a7.png" loading="lazy" />
</figure>
