# Salesforce REST API Node.JS integration

## Description:

The tasks included in this codebase are:

- Retrieve and display the values of the fields First_Name\_\_c, Last_Name\_\_c, Year\_\_c and Year_Of_Experience\_\_c of the Candidature\_\_c object, for the record that has the ID: a004L000002gCJK

- Insert a new application with your information (first name, last name, Year of Experience).

- Modify the Last_Name\_\_c of ID a004L000002gCJK with your last name.

- Retrieve all applications from Salesforce

- Implement a searching endpoint

## Built With

- `JavaScript` as the main programming language of the project
- `NodeJs` and `ExpressJs` as the main backend framework
- `npm` as our main package manager
- `winston` and `morgan` as the logging libraries

## Getting Started

**This is an example of how to set up your local development environment locally.**

To get a local copy up and running follow these simple example steps:

### Prerequisites

- NodeJS >= 12.0: `node` can be downloaded from the official release [website](https://nodejs.org/en/download/)

### Clone Repository

```bash
# Clone the repo
git clone https://github.com/Lamia-Mihoubi/SOLJIT_Technical_Test.git
```

### Install Dependencies

```bash
# Change to your working directory
cd CLONED-REPO-DIRECTORY
# Install backend NPM dependencies
npm install
```

### Setup Your Environment Variables

```env
cp .env.example .env
```

### Launch Your API

```bash
# Start the api
npm run start
```
