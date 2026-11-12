---
title: "VCF Automation 9: Understanding the Fundamentals"
description: "Making sense of VCF Automation 9 All Apps: regions, organizations, projects, namespaces, VPCs and the networking behind a practical landing zone."
slug: "vcf-automation-overview"
cover: "/assets/images/vcf-automation/vcf-automation-tenant-structure.png"
draft: false
---

# Figuring Out VCF Automation 9

I'll be honest: VCF Automation was never the part of VMware I spent the most time in. I was far more comfortable with vSphere, NSX and the infrastructure underneath. But as I started working more with VCF 9, it became clear that I needed to understand how Automation ties everything together.

At first, I thought I'd just work my way through the initial configuration screens. Create a region, add an organization, configure some networking, and off we go.

It wasn't quite that simple.

The individual steps aren't necessarily difficult. The tricky part is understanding **why you're creating each object**, which objects belong to the platform team, and what an application team is actually supposed to see when everything is finished.

This post is my attempt to put those pieces together. It's not a deployment walkthrough or an official reference architecture. It's the explanation I wish I'd had when I first started exploring VCF Automation 9.

## First, what is Automation supposed to solve?

If you've spent years working in vCenter, you're used to thinking in clusters, resource pools, datastores and port groups. Someone needs a VM, and you figure out where to put it, which network it belongs on and who should have access.

VCF Automation introduces another layer. The infrastructure team still manages the actual platform, but the people using it shouldn't need to understand every detail of the underlying vSphere and NSX setup.

Instead, they should be able to say something like:

> I need an environment for my application. Give me a place to deploy VMs or Kubernetes workloads, an approved network, and enough resources to get started.

That's where regions, organizations, projects, namespaces and VPCs come in.

## All Apps and VM Apps: two different experiences

One of the first choices in VCF Automation 9 is the organization type.

**VM Apps** is the more familiar choice if you're coming from the classic Aria Automation world. It focuses on VM-centric workflows and the automation model many teams have already built around.

**All Apps** is designed around a broader consumption model. VMs are still very much part of the picture, but so are vSphere Supervisor namespaces, Kubernetes and the services exposed through that ecosystem.

I wouldn't describe All Apps as “VM Apps with Kubernetes added.” The way you organize workloads and give teams access is different enough that it's worth learning on its own.

For this article, I'm focusing on **All Apps**. If you're already running VM Apps and have a collection of blueprints, don't assume they'll work unchanged in All Apps.

<figure>
<img src="/assets/images/vcf-automation/vcf-automation-tenant-structure.png" loading="lazy" alt="VCF Automation tenant hierarchy, showing provider and tenant objects" />
<figcaption>VCF Automation tenant relationships. Image: <a href="https://theaistack.blog/2025/08/12/vcf-automation-tenant-management/">VMTECHIE</a>.</figcaption>
</figure>

## Start at the provider layer

The easiest way I've found to understand the initial setup is to divide Automation into two sides.

The **provider side** prepares infrastructure, capacity and network connectivity.

The **organization side** uses those resources to give application teams somewhere to work.

It sounds obvious, but that distinction helps a lot when you find yourself looking at several configuration screens with similar names.

### Region: where the workloads can run

A **Region** describes a logical area of infrastructure that Automation makes available.

You might choose to organize regions by geography, environment or operational boundary. For instance, a platform with separate northern and southern locations might expose them as two regions.

The important thing is that a region is not automatically the same as a single Workload Domain. Depending on the VCF release and configuration, a region can include multiple compatible Supervisors, potentially across vCenters, while using the relevant NSX infrastructure.

When setting one up, you're effectively telling Automation which Supervisor capacity and storage capabilities are available in that part of the platform.

What I find useful here is to think from the consumer's point of view. If somebody chooses a region called *South Production*, what should they reasonably expect? Which workloads can run there? What storage can they use? Which networks can they reach?

If the answers differ dramatically depending on the underlying cluster, the region design probably needs another look.

### Organization: who is consuming the platform?

Next comes the **Organization**.

This is a tenant boundary, not just a folder for resources. The provider creates an organization and makes a controlled amount of infrastructure available to it.

You can build a multi-tenant platform with separate organizations for different customers or business units. But in an internal enterprise platform, you may not need lots of organizations at all.

Personally, I would start by asking whether there is a genuine need for separate tenant administration, identity or isolation. If not, **one organization with several projects** can be a much simpler starting point.

That's a design preference, not a fixed rule. The point is to avoid creating organizational complexity before you know what it solves.

### Region quotas: defining the boundaries

An organization shouldn't automatically have unlimited access to everything in a region.

The provider assigns **region quotas** to control the resources the organization can consume. That gives you an important guardrail before the organization administrator starts creating projects and namespaces.

It's worth remembering that a quota is not the same thing as guaranteed physical capacity. A deployment still needs a suitable Supervisor, cluster, storage and placement configuration.

## Networking is where things become interesting

This was the part that took me the longest to get comfortable with.

If you're familiar with NSX, you'll recognize many of the underlying building blocks. But Automation presents them through another set of objects: **IP Spaces, Provider Gateways, regional networking, Transit Gateways and VPCs**.

They all have a purpose, and it helps to follow the traffic from the workload towards the rest of the network.

### IP Space: managing the addresses

An **IP Space** is used to manage address space for provider networking and external connectivity.

These don't have to be public internet addresses. In a private cloud, they may well be routable addresses from your organization's internal network.

One distinction matters here: the **private subnet inside a VPC** is not necessarily the same address space used for a NAT address or a load-balancer VIP exposed to the rest of the network.

Having a pool of addresses available doesn't automatically make those addresses reachable. Routing and firewall policies still have to be in place.

### Provider Gateway: reaching the outside world

A **Provider Gateway** provides connectivity from the organization networking environment towards upstream networks.

In the centralized NSX networking model, the provider gateway uses an NSX Tier-0 gateway or Tier-0 VRF.

I find it easiest to think of it as the provider-owned exit from the organization network, rather than the local default gateway of every VM.

At this point, the platform team has defined the upstream connection, but the organization still needs to be given access to the appropriate regional networking resources.

### Regional networking: connecting the pieces

This is one of those steps that initially felt a little redundant. Didn't we already configure the gateway?

Yes, but defining an infrastructure resource and **making it available to an organization** are two different things.

Regional networking is where the provider connects the organization to the approved networking resources in a region. Depending on the release and configuration, Automation creates or configures supporting NSX objects behind the scenes.

If you can see a region but can't deploy workloads with the network connectivity you expect, this is one of the areas worth checking.

<figure>
<img src="/assets/images/vcf-automation/nsx-vpc-components.png" loading="lazy" alt="NSX VPC components and administrative roles" />
<figcaption>NSX VPC building blocks. Image: <a href="https://vmcheese.com/all-of-the-ways-to-deploy-and-use-vpcs-in-vcf-9-part-1.html">vmcheese</a>.</figcaption>
</figure>

### Transit Gateway and VPC: the organization network and the application network

Once you're working inside the organization, the next useful distinction is between the **Transit Gateway** and the **VPC**.

The Transit Gateway provides a connection point between the organization's VPC networking and the upstream provider network in the centralized model.

A **VPC** is the network boundary where an application's workloads live. It can contain multiple subnets, so a system with a web tier, application tier and database tier doesn't necessarily need three separate VPCs.

For me, that leads to a better design question than “how many VPCs should we create?”

**Which workloads belong together, and which ones should be isolated?**

Two unrelated systems might deserve separate VPCs even though they're owned by the same organization. On the other hand, two namespaces belonging to the same system may be able to share a VPC if the security and lifecycle requirements allow it.

And one important detail: **sharing an organization doesn't automatically mean unrestricted connectivity between VPCs**. Routing and firewall policy still matter.

### What about NAT and load balancers?

Let's say a VM gets a private address from a subnet inside its VPC. That doesn't mean clients elsewhere on the enterprise network can reach it directly.

For outbound communication, you might use source NAT. For inbound access, you could use destination NAT or expose an application through an approved load-balancer VIP.

Whichever approach you choose, you still need to think about the return route, firewall rules, address allocation and where those network services actually run.

I learned pretty quickly that **“the workload has an IP” and “the workload is reachable” are two very different statements**.

<figure>
<img src="/assets/images/vcf-automation/vcf9-transit-gateway-options.jpg" loading="lazy" alt="Centralized and distributed Transit Gateway connectivity in VCF 9" />
<figcaption>Transit Gateway connectivity options in VCF 9. Image: <a href="https://vmcheese.com/all-of-the-ways-to-deploy-and-use-vpcs-in-vcf-9-part-1.html">vmcheese</a>.</figcaption>
</figure>

## Then we get to Projects and Namespaces

When the provider has prepared the region, quota and networking, the organization administrator can start making resources useful to actual teams.

This is where the abstraction begins to make sense.

### Project: a home for the team or system

A **Project** is the workspace that brings together users, permissions and resources within an organization.

You could organize projects by team, application or system. There's no universal answer, but for an internal platform I like the idea of a project representing a system or application.

That gives you a reasonably clear place to answer questions like:

- Who owns this application?
- Who can deploy and manage its resources?
- Which environments and regions should it use?

The project isn't the thing actually running your VM. It's the governance and collaboration boundary around the resources the team uses.

### Namespace: where the workload runs

A **vSphere Namespace** is much closer to the actual execution environment.

It exists on the vSphere Supervisor and provides a boundary for supported VM and Kubernetes resources. Namespace configuration, policies and quotas determine what can be deployed and under which constraints.

A project can work with multiple namespaces, which gives you room to separate workloads with different needs.

There's also a terminology trap worth mentioning: a vSphere Namespace is **not** the same thing as a Kubernetes namespace created *inside* a VKS cluster. They exist at different layers.

### Namespace classes: don't make everyone start from scratch

A **Namespace Class** helps standardize what a namespace should look like.

Instead of asking every application owner to work out appropriate resource limits and available infrastructure options, the platform team can establish sensible defaults and approved choices.

For a production platform, I would spend time on these defaults early. Otherwise, self-service can easily turn into everyone building something slightly different.

<figure>
<img src="/assets/images/vcf-automation/vcf-automation-create-namespace.png" loading="lazy" alt="VCF Automation 9 namespace configuration screen" />
<figcaption>A real All Apps namespace configuration screen. Image: <a href="https://devynharrington.com/vcf/building-an-all-apps-organization-in-vcf-automation-9/">Devyn Harrington</a>.</figcaption>
</figure>

## Putting it together: an example landing zone

Let's say we're onboarding a new internal application called **Inventory**.

It needs application servers and a database. The team should be able to deploy and manage what it owns, but it shouldn't need administrator access to vCenter or NSX.

Here's how I would start thinking about it.

The infrastructure team exposes a production **Region** with the appropriate Supervisors, storage and upstream networking. The internal **Organization** receives quota in that region and access to its approved networking configuration.

Within the organization, we create an **Inventory Project** and give the application team the relevant permissions.

Then we create two **Namespaces**: one for the application tier and another for the database. They can have different resource limits or placement policies if needed.

Finally, we provide an **Inventory VPC** with separate application and database subnets. If both tiers share a trust boundary, using one VPC may be enough. If the database needs stronger isolation, we'd reconsider that choice.

The result could look something like this:

~~~text
Region: South Production
  Organization: Internal IT
    Project: Inventory
      Namespace: inventory-app-prod
      Namespace: inventory-db-prod
      VPC: inventory-prod
        Subnet: application
        Subnet: database

Upstream connectivity:
  VPC -> organization transit -> provider gateway
      -> enterprise network
~~~

This is a design sketch, not a claim that all those objects form one literal folder hierarchy in the UI.

What I like about this approach is that it starts with the **application's ownership and requirements**, rather than building a network first and trying to fit everything into it afterwards.

It also gives us a sensible discussion with the application owner: Do they really need separate namespaces? Do they require dedicated placement? Who will approve firewall changes? What happens when they need another environment?

Those decisions are much easier to make before the platform has dozens of projects on it.

## Where do VMs, Kubernetes and blueprints fit?

The good news is that the application team shouldn't need to know every provider configuration detail.

Once the region, project, namespace, networking and supported services are ready, the team can consume the workload types exposed in their environment. Depending on the configuration and release, that may mean VMs, VKS clusters or other supported services.

This is also where templates, catalogs, APIs and automation workflows become interesting.

For example, rather than asking a developer to choose every option for a VM, we could offer a standard deployment with a supported image, VM class, storage choice and network configuration.

But I'd resist the temptation to begin with the blueprint.

**A nice deployment form won't fix an unclear landing zone design.** First decide ownership, access, networking, placement and quotas. Then automate the result.

## A few things I'd check before calling it production-ready

Having gone through these concepts, these are the questions I'd want answered before onboarding real application teams:

- Does each Region represent an infrastructure boundary that people can understand?
- Are Organization quotas and namespace limits intentional?
- Is it clear who owns Projects, Namespaces and VPCs?
- Do we know which VPCs need to talk to one another, and who approves that access?
- Are external IP allocation, NAT, load balancing and upstream routes designed together?
- Can the application team actually reach the services it needs, including DNS, registries and APIs?
- Have we tested a complete workload deployment rather than just creating the objects in the UI?

That last one is particularly important. It's easy to end up with a region, organization and project that all look perfectly healthy, only to discover that the first real workload is missing a network, an IP allocation or a required service.

## The big picture



If I had to explain the main concepts to somebody starting with VCF Automation 9, I'd put them like this:

**The provider makes infrastructure available through Regions, quota and networking. The Organization owns its allocated slice. Projects organize the people and applications. Namespaces provide the runtime boundaries. VPCs provide the networks those workloads need.**

That's the mental model I keep coming back to.

I'm still learning the platform, and there are plenty of details I want to explore further, especially how best to standardize landing zones and expose them through automation. But understanding these relationships has made the rest of the product a lot easier to navigate.

And I think that's the real value of VCF Automation: not just deploying another VM faster, but making it easier to offer infrastructure as a consistent service.

## Useful references

I found these useful when working through the terminology and the differences between releases:

- [VMware Cloud Foundation Automation – All Apps Organization Configurations](https://blogs.vmware.com/cloud-foundation/2025/11/07/vmware-cloud-foundation-automation-all-apps-organization-configurations/)
- [The Hierarchy of Modern Infrastructure: VCF Automation, vSphere and VKS Namespaces](https://blogs.vmware.com/cloud-foundation/2026/03/05/the-hierarchy-of-modern-infrastructure-mastering-namespaces-in-vmware-cloud-foundation-vsphere-kubernetes-service-and-vcf-automation/)
- [Configuring shared vCenter and NSX Manager for VM Apps and All Apps](https://knowledge.broadcom.com/external/article/444058/configuring-a-shared-vcenter-and-nsx-man.html)

*This article reflects how I'm approaching the design in my lab. Always check the official documentation for the specific VCF Automation 9.x release you're running before applying the same configuration in production.*
