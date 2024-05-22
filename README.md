
# Employee Dashboard Project

## Description

A Dashboard project to manage Employees, created using Create React App, Tailwind, and React Bootstrap.

---

## Install the Node.js Dependencies

Ensure you have a recent version of Node.js running on your local machine, then run:

```sh
npm ci
```

---

## Copy and Update Your Environment Settings

```sh
cp development.env .env
```

You can edit the API endpoint and the local PORT for testing. Note that for this sample project, both API endpoints point to a live staging server for tests.

---

## Run the Project

```sh
npm start
```

---

## Run Tests

```sh
npm run test
```

---

## Build for Production

```sh
N/A
```

This sample project is only available for local testing.

---

## Features Overview

- Utilized React Context to manage the state of the employees list, enabling future scalability.
- Added React Router to route URLs for the Dashboard and Employee Details/Management. Routes default to the Dashboard if not found.
- Created a composable `CommonTemplate` to handle the layout of the app.
- Added a Navbar.
- Implemented a responsive layout.

---

## The Dashboard

- Implemented a zero state if no employee is found.
- Added text filters to search by name and position. A "X" button appears to clear the search once the user starts typing.
- Added a dropdown filter to search by Department. The Department is a set of strings, providing more control over data.
- Clicking on an employee row redirects the user to view the employee's details.
- Clicking on the "New Employee" button redirects the user to the Employee Details page with blank fields.

---

## Employee's Details

- Created a responsive design page.
- Added six main inputs: "Name", "Email", "Position", "Department", "Salary", and "Start Date".
- If the employee is already created, two additional non-editable inputs are shown: "Created At" and "Updated At".
- All editable inputs have various validations, except for the department, which is a restricted set of values.
- If all inputs are valid, the "Save/Update" button is enabled.
- Feedback messages are displayed under the inputs to provide user confidence while editing the fields.
- Implemented a button to delete the employee if they already exist. Clicking the button shows a modal to confirm the deletion.

---

## Extra

- Implemented a custom hook `useDebounce` to prevent over-fetching data from the employees' index endpoint.
- Created custom API utilities to wrap the fetch API, enhancing scalability over networking and ensuring strong data-typing on responses.
- Developed custom UI components such as Button, Panel, and Toast.
- Added automated tests using Jest for most of the components.

---

## The Backend

The backend was developed using Node.js, Express.js, and MongoDB. Feel free to contact the developer if you wish to test the local database on your machine.

---