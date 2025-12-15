# Sanbercode QA Bootcamp - Batch 72: OrangeHRM Test Automation
This project demonstrates modern test automation practices using **Cypress** for comprehensive web application testing of the **OrangeHRM Demo Portal**. Specifically developed to validate three core functionalities of the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login), it implements the **Page Object Model (POM)** design pattern and utilizes **API interceptors** to create efficient, maintainable, and reliable automated tests.

## 🎯 **Primary Testing Objectives**

The automation suite is designed to rigorously test the following features of the OrangeHRM platform:

| Feature | Purpose | Test Scope |
| :--- | :--- | :--- |
| **🔐 Login** | Validate authentication mechanisms and user access controls. | Positive/Negative login scenarios, credential validation, and session management. |
| **🔓 Forgot Password** | Verify the password recovery workflow and its communication steps. | Reset request flow, input validation, and simulated email/SMS interactions. |
| **👥 Directory** | Ensure the employee directory's search, filter, and display functions work correctly. | Employee search, data filtering, UI responsiveness, and information accuracy. |

## ⚙️ Prerequisites
Before setting up this automation project, ensure you have the following installed on your system:

| Requirement | Purpose | How to Check |
| :--- | :--- | :--- |
| **Node.js (v14+)** | Runtime environment to execute Cypress and npm packages. | `node --version` |
| **npm** | To install project dependencies and run scripts. | `npm --version` |
| **Git** | For cloning the repository and version control. | `git --version` |
| **Web Browser** | Chrome (v100+), Firefox, or Edge to run the tests. | Typically installed on system. |
