---
title: "Changing between Appliance shell and bash shell"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "changing-between-appliance-shell-and-bash-shell"
cover: "/assets/images/9caa180f76749db9.png"
draft: false
---

# Changing between Appliance shell and bash shell

#### I initially logged into the Bash shell on the vCenter server, but when I needed to switch to the appliance shell to run specific commands, I struggled with the process. This challenge prompted me to create this article to help others avoid similar issues. The situation occurred when I needed to switch shells while patching the vCenter server.

#### If you are in an SSH session with the vCenter server and running commands in the Bash shell, but need to switch to the appliance shell, follow these steps:

#### Run the following command to change the shell to the appliance shell chsh -s /bin/appliancesh root

**Then type:**  
Exit

**Log back in, and you will be prompted to select the shell you wish to use.**

<figure>
<img src="/assets/images/9caa180f76749db9.png" loading="lazy" />
</figure>
