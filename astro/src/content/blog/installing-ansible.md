---
title: "Installing Ansible"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "installing-ansible"
cover: ""
draft: false
---

# Installing Ansible

There are many ways to install Ansible, and this is my experience. As someone with limited knowledge of Linux and Ansible, I relied on the official Ansible installation guide to set it up for my environment. My lab consists of a vCenter server and an ESXi host, and this guide outlines the steps I followed to start learning Ansible.

If you have a similar setup, this guide will help you get started. In this series, we’ll focus on automating some basic VMware operations using Ansible.

#### Start by installing a Rocky Linux 8 machine. Initially, I tried using Ubuntu 24.04.1 LTS, but encountered some unexpected errors while using the VMware package for Ansible. Once your Rocky Linux machine is set up and running, open the terminal and execute the following commands:

sudo dnf install python3 -y

sudo dnf install epel-release -y

sudo dnf install ansible -y

ansible-galaxy collection install community.vmware

sudo dnf install python3-pyvmomi -y

With Ansible installed and the community.vmware collection added, you're ready to start using Ansible.

Next, navigate to the Ansible folder on your machine:

cd /etc/ansible/

To keep things organized, I recommend creating a new directory for your playbooks. Run the following command to create a directory named playbooks:

mkdir playbooks

You're now ready to dive into your first automation task, which will be covered in the next post (link below).

<u>[First automation!](/first-automation)</u>
