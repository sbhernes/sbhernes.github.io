---
title: "Got the error \"Throwable proxy\"?"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "throwable-proxy"
cover: "/assets/images/7606392ee3072c4a.webp"
draft: false
---

# Got the error "Throwable proxy"?

**I had the issue when I was trying to deploy a OVF template and I got the error throwable proxy as shown in the picture below**

### In my case, the issue was related to DNS. Here are a couple of solutions you can try:

- Log in to vCenter using its IP address instead of the hostname.

- Try logging directly into the ESXi host using its IP address.

- 

These steps served as a workaround for my issue.

<figure>
<img src="/assets/images/7606392ee3072c4a.webp" loading="lazy" />
</figure>

<figure>
<img src="/assets/images/50597fb750ec404f.png" loading="lazy" />
</figure>
