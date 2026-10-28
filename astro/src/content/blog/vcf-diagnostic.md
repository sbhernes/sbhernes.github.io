---
title: "Have you heard about VCF Diagnostic Tool for vSphere?"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "vcf-diagnostic"
cover: "/assets/images/99cc94831e2e5244.png"
draft: false
---

# Have you heard about VCF Diagnostic Tool for vSphere?

**I encountered an issue with our vCenter not running properly and needed to perform a diagnostic check. Unsure of the best approach, I was eventually recommended to use the VCF Diagnostic Tool.**

### How to use VCF Diagnostic Tool: First download the VCF diagnostic script from broadcom site, this is the link I used: <https://knowledge.broadcom.com/external/article?legacyId=83896>  When you have downloaded the zip file from the link, upload it to your vCenter server. I used winSCP and uploaded it to the tmp folder in the vCenter.  **Then** open a ssh connection to the vCenter and go to the tmp directory. Then unzip the zip file with this command: **unzip vdt-2.0.8-09_18_2024**

### then run the script: **Python vdt.py**  **After running the script** you will get an overview over all the componetns for the vCenter and their health. 

### In my case I had an issue with the VPXD thumbprint. 

<figure>
<img src="/assets/images/99cc94831e2e5244.png" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/8ce9a371f8b70b43.png" loading="lazy" />
</figure>
