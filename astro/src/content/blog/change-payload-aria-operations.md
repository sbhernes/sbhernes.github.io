---
title: "Change payload from aria operations to Slack"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "change-payload-aria-operations"
cover: ""
draft: false
---

# Change payload from aria operations to Slack

## Configuring payload in Aria Operations to slack

If you’ve ever hooked up **Aria Operations** alerts to **Slack**, you know the default payloads can be... a bit much. All that raw data isn’t exactly easy on the eyes. In this post, I’ll show you how to clean things up and make those Slack messages way more readable—so your team can actually make sense of them at a glance. No more digging through walls of text just to figure out what’s going on.

**Operations → Configurations → Notifications**

### Step 1: Select Alert Types

We currently focus on alerts related to **Host Systems**, specifically:

- Storage issues

- Network connectivity

- Administrative actions

- Virtualization-related problems

### Step 2: Choose Notification Method

Aria Operations offers several outbound notification methods:

#### 🔹 1. File Plugin

Writes alerts to a local file.  
*Use case:* Log analysis tools like ELK or Splunk.  
*Pros:* Offline usage.  
*Cons:* No external alerting.

#### 🔹 2. REST Notification Plugin

Sends JSON-formatted alerts to a REST API endpoint.  
*Use case:* Integrating with third-party systems.  
*Pros:* Highly flexible.  
*Cons:* Requires proper API handling on the receiving end.

#### 🔹 3. Email Plugin

Sends alerts via email.  
*Use case:* Notifying ops teams or on-call staff.  
*Pros:* Easy to configure.  
*Cons:* High email volume can cause alert fatigue.

#### 🔹 4. SNMP Trap Plugin

Sends SNMP traps to tools like SolarWinds or Nagios.  
*Pros:* Standards-based, widely supported.  
*Cons:* Limited flexibility.

#### 🔹 5. Webhook Plugin

Sends alerts as HTTP POST requests to any URL.  
*Use case:* DevOps workflows, automation, CI/CD.  
*Pros:* Easy integration with modern platforms.  
*Cons:* Less customization than REST.

#### 🔹 6. Slack Plugin

Sends alerts to Slack channels via Webhooks.  
*Use case:* Team-based ChatOps.  
*Pros:* Instant visibility.  
*Cons:* Limited control over message formatting.

#### 🔹 7. ServiceNow Plugin

Creates incidents directly in ServiceNow.  
*Use case:* ITSM and automated incident management.  
*Pros:* Seamless ticketing integration.  
*Cons:* Requires authenticated API access.

### ✅ Our Choice:

We opted for **Webhook integration with Slack** rather than using the native Slack plugin. Why? The Slack plugin doesn’t allow payload customization — which we needed for rich, structured alert messages.

#### Example: Standard Payload

{

"startDate": "\${CREATE_TIME}",

"updateDate": "\${UPDATE_TIME}",

"cancelDate": "\${CANCEL_TIME}",

"resourceId": "\${RESOURCE_ID}",

"adapterKind": "\${ADAPTER_KIND}",

"resourceKind": "\${RESOURCE_KIND}",

"resourceName": "\${RESOURCE_NAME}",

"Health": "\${OBJECT_HEALTH_STATE}",

"Risk": "\${OBJECT_RISK_STATE}",

"Efficiency": "\${OBJECT_EFFICIENCY_STATE}",

"impact": "\${ALERT_IMPACT}",

"criticality": "\${ALERT_CRITICALITY}",

"alertName": "\${ALERT_DEFINITION}",

"type": "\${ALERT_TYPE}",

"subType": "\${ALERT_SUBTYPE}",

"alertId": "\${ALERT_ID}",

"status": "\${ALERT_STATUS}",

"recommendations": "\${ALERT_RECOMMENDATIONS}",

"alertURL": "\${LINK_TO_ALERT}"

}

#### Customized Payload:

{

"text": "\*Alert triggered in VMware Aria Operations at \${CREATE_TIME}\*",

"attachments": \[

{

"pretext": "\*\${ALERT_DEFINITION}\*",

"fallback": "TEST fallback",

"color": "#F84D41",

"mrkdwn_in": \[

"pretext",

"title",

"fields"

\],

"fields": \[

{

"title": "Criticality",

"value": "\${ALERT_CRITICALITY}",

"short": true

},

{

"title": "Cluster",

"value": "\${RESOURCE_ID}",

"short": true

},

{

"title": "Resource name",

"value": "\${RESOURCE_NAME}",

"short": true

},

{

"title": "Link to alert",

"value": "\${LINK_TO_ALERT}"

},

{

"title": "Recommendations",

"value": "Check recommendations in Operations"

}

\]

}

\]

}

PICTURE FROM OUTPUT (CUSTOM AND STANDARD)

## 🧮 Variable Reference

Here’s what the alert variables mean:

**Timestamps:**

- \${CREATE_TIME} – Alert created

- \${UPDATE_TIME} – Last updated

- \${CANCEL_TIME} – Alert ended

**Resources:**

- \${RESOURCE_ID} – Unique resource ID

- \${RESOURCE_NAME} – Display name

- \${RESOURCE_KIND} – Type (e.g. HostSystem)

- \${ADAPTER_KIND} – Adapter type

**States:**

- \${OBJECT_HEALTH_STATE} – GREEN / YELLOW / RED

- \${OBJECT_RISK_STATE} – LOW / MEDIUM / HIGH

- \${OBJECT_EFFICIENCY_STATE} – Efficiency level

**Alert Details:**

- \${ALERT_ID} – Unique ID

- \${ALERT_STATUS} – Active / Cancelled

- \${ALERT_CRITICALITY} – Severity

- \${ALERT_IMPACT} – Impact scope

- \${ALERT_TYPE} – General category

- \${ALERT_SUBTYPE} – Specific category

- \${ALERT_DEFINITION} – Rule name

- \${ALERT_RECOMMENDATIONS} – Suggested actions

- \${LINK_TO_ALERT} – URL to alert

And that’s it! With just a few tweaks, you can turn those messy Aria Operations payloads into clean, readable Slack alerts your team will actually appreciate. A little formatting goes a long way. Got questions or your own tips? Drop them in the comments—I'd love to hear how you’ve customized your setup!

### DATO
