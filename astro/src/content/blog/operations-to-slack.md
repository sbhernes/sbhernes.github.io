---
title: "Simplifying Aria Operations Alarm Notifications in Slack"
description: "Discover insights on virtualization and cloud-native technologies. This blog by Sondre Hernes focuses on VMware, providing valuable information and resources for enthusiasts and professionals in the field. Join the conversation and enhance your understanding of modern tech solutions."
slug: "operations-to-slack"
cover: ""
draft: false
---

# Simplifying Aria Operations Alarm Notifications in Slack

First go to Operations → Configurations → Notification

Here you can choose many different plug in types, we choose webhooks here because we can change the payload in this plug in vs the slack plug in. After creating the the notification you can choose what kind of alarms you want notifications about.

**Select Plug-In Type**

- Automated Action Plugin

- Log File Plugin

- Rest Notification Plugin

- Network Share Plugin

- Standard Email Plugin

- SNMP Trap Plugin

- Webhook Notification Plugin

- Slack Plugin

- ServiceNow Notification Plugin

Here is a short explenation about the different plug ins:

  
🔹 1. **Log File Plugin**

**Description:** Writes alarm data to a local file.  
**Use case:** Local monitoring via log analysis tools (e.g., ELK, Splunk).  
**Pros:** No network connection required.  
**Cons:** No external notifications.

#### 🔹 2. **REST Notification Plugin**

**Description:** Sends notifications to a REST API endpoint.  
**Use case:** Integration with third-party systems.  
**Pros:** Flexible and modern (supports JSON).  
**Cons:** Requires proper handling on the receiver side.

#### 🔹 3. **Standard Email Plugin**

**Description:** Sends alerts via email.  
**Use case:** Suitable for operations teams or on-call staff.  
**Pros:** Simple to configure.  
**Cons:** Alerts can easily get lost in email traffic.

#### 🔹 4. **SNMP Trap Plugin**

**Description:** Sends SNMP traps to monitoring tools (e.g., SolarWinds, Nagios).  
**Pros:** Standardized and widely supported.  
**Cons:** Limited flexibility.

#### 🔹 5. **Webhook Notification Plugin**

**Description:** Sends HTTP POST messages to a specified URL.  
**Use case:** Commonly used in CI/CD pipelines and automation workflows.  
**Pros:** Easy integration with modern services.  
**Cons:** Less customizable than the REST plugin.

#### 🔹 6. **Slack Plugin**

**Description:** Sends alerts to Slack via Webhooks.  
**Use case:** Ideal for ChatOps and team notifications.  
**Pros:** Fast and highly visible alerts in team channels.  
**Cons:** Limited flexibility in customizing the payload.

#### 🔹 7. **ServiceNow Plugin**

**Description:** Creates incidents directly in ServiceNow.  
**Use case:** ITSM and incident management.  
**Pros:** Fully automated ticket creation.  
**Cons:** Requires API access and authentication.

### **Customizing the Payload for Slack Notifications**

After selecting Webhooks as the outbound method, you can customize the message structure under the Payload Template section.

#### **Default Payload**

By default, Aria Operations sends the following JSON payload:

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

### **Explanation of Variables**

#### 📅 Time Variables

- \${CREATE_TIME} – When the alert was created

- \${UPDATE_TIME} – Time of the last update

- \${CANCEL_TIME} – When the alert was resolved

#### 🆔 Resource Variables

- \${RESOURCE_ID} – Unique ID of the resource

- \${RESOURCE_NAME} – Name of the resource

- \${RESOURCE_KIND} – Resource type (e.g., *HostSystem*)

- \${ADAPTER_KIND} – Adapter type (e.g., *VMWARE*)

#### 🚦 State Variables

- \${OBJECT_HEALTH_STATE} – Health state (GREEN, YELLOW, RED)

- \${OBJECT_RISK_STATE} – Risk level (LOW, MEDIUM, HIGH)

- \${OBJECT_EFFICIENCY_STATE} – Efficiency assessment

#### 🚨 Alert Details

- \${ALERT_ID} – Unique ID of the alert

- \${ALERT_STATUS} – Status (active, canceled, etc.)

- \${ALERT_CRITICALITY} – Severity of the issue

- \${ALERT_IMPACT} – Impacted area

- \${ALERT_TYPE} – Main category

- \${ALERT_SUBTYPE} – Specific subcategory

- \${ALERT_DEFINITION} – Name of the alert rule

- \${ALERT_RECOMMENDATIONS} – Recommended actions

- \${LINK_TO_ALERT} – Direct link to the alert in Aria Operations

You can customize the payload to fit your specific needs.  
In our case, we modified it to the following format:

{

"text": "\*Alert triggered in VMware Aria Operations at \${CREATE_TIME}\*",

"attachments": \[

{

"pretext": "\*\${ALERT_DEFINITION}\*",

"fallback": "TEST fallback",

"color": "#F84D41",

"mrkdwn_in": \["pretext", "title", "fields"\],

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

"title": "Resource Name",

"value": "\${RESOURCE_NAME}",

"short": true

},

{

"title": "Link to Alert",

"value": "\${LINK_TO_ALERT}"

},

{

"title": "Recommendations",

"value": "Check recommendations in Operations"

}

\]

}

\]

Hope this was helpful, thank you for reading.

}

{

## We use Aria Operations to monitor alarms for our infrastructure. These alarms are sent directly to a Slack channel for real-time notifications.

## However, we encountered an issue, the alarm messages were too long and difficult to read due to excessive details in the payload. To solve this, we decided to customize and simplify the alarm payload before sending it to Slack.

## This article explains how we modified the payload to make alarm notifications clearer and more readable.

### Posted 21.10.2025
