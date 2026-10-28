---
title: "First Steps with Ansible Automation"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "first-automation"
cover: ""
draft: false
---

#### **This blog post introduces the first step in automation. From here, you can build on the code and customize it to automate anything you desire.**

**Since I primarily use VMware, the first automation example will focus on VMware. We'll start by creating a cluster and then expand the code to include additional configurations like enabling HA or DRS.**

### Step 1: Create a Variable File

First, let's create a file to store the necessary variables. Use the following command to create the file within the playbooks folder:

*sudo nano vars.yml*

Next, populate the vars.yml file with the required variables. Here's an example:

*---*

*vcenter_hostname: "vcenter name"*

*vcenter_datacenter: "LAB"*

*vcenter_validate_certs: false*

*vcenter_username: "vcenter username"*

*vcenter_password: "PW"*

*cluster_name: "test"*

### Step 2: Create the Playbook

Now, we'll create the Ansible playbook to set up the cluster. Here's the example playbook:

---

\- name: Create VMware Cluster

hosts: [localhost](http://localhost)

gather_facts: false

collections:

\- community.vmware

pre_tasks:

\- include_vars: vars.yml

tasks:

\- name: Create Cluster

vmware.vmware.cluster:

hostname: "{{ vcenter_hostname }}"

username: "{{ vcenter_username }}"

password: "{{ vcenter_password }}"

validate_certs: "{{ vcenter_validate_certs }}"

datacenter_name: "{{ vcenter_datacenter }}"

cluster_name: "{{ cluster_name }}"

state: present

### Step 3: Run the Playbook

Execute the playbook using the following command:

*ansible-playbook createcluster.yml*

This will create a VMware cluster named test.

### Step 4: Expand the Code

From here, you can enhance the automation by adding more configurations to the cluster, such as enabling High Availability (HA) or Distributed Resource Scheduling (DRS). You can also modify the playbook to create multiple clusters by using an array of cluster names.
