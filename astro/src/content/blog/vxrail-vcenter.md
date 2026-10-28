---
title: "How to check if a VxRail enviroment are using external or internal vcenter"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "vxrail-vcenter"
cover: "/assets/images/5c6de30f8740c1b1.webp"
draft: false
---

# How to check if a VxRail enviroment are using external or internal vcenter

**We recently took over a customer with an existing VxRail environment. After the transition, we needed to apply a security patch to the vCenter. To do this, we first had to determine whether the vCenter was configured as an internal or external instance. If it was internal, patching would require using the VxRail Manager, which had not yet released the necessary update.**

### There are two types of vCenters that can be deployed with a VxRail cluster:

**Internal vCenter**: This is deployed on the day the VxRail cluster is set up, handled directly by VxRail Manager. It is an integral part of the VxRail solution and is managed within the cluster by VxRail Manager. When VxRail upgrades are performed, the following are updated according to the upgrade matrix: VxRail Manager, vCenter, and ESXi nodes.

**External vCenter**: In this setup, the customer already has their own vCenter deployed, and the VxRail cluster is configured to reference this external vCenter. The external vCenter is not managed by VxRail and remains the customer's responsibility.

To determine if the vCenter is internal or external, open an SSH session to the VxRail Manager node and run the following command:

curl --unix-socket /var/lib/vxrail/nginx/socket/nginx.sock

The output will be one of the following:

- key: "state_customized_vc", value: "true" — This indicates an **external vCenter** server, not tied to the VxRail cluster.

- key: "state_customized_vc", value: "false" — This indicates an **internal vCenter** server, managed by VxRail Manager.

<figure>
<img src="/assets/images/5c6de30f8740c1b1.webp" loading="lazy" />
</figure>
