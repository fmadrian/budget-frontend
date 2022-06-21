# budget-frontend

## Description

[Project description](https://github.com/fsv2860/budget)

[Backend repository](https://github.com/fsv2860/budget-backend)

This repository contains the instructions to install the application's frontend.

## Local deployment

### General requirements

1. Install [nodejs](https://nodejs.org/) v14.17.0.

### Packages requirements

2. To install the packages required, run the following command:

```
npm install
```

### Connecting to the API

3. Go to the file **apiRoutes.ts** located in **src/app/utils/**.
4. Change the variable **serverRoute** to match the server url and port where your API has been deployed.

### Local deployment

5. To deploy locally run the following command:

```
ng serve
```

### Final step

6. Make sure the API is accessible as it is needed to use the web app.

## Built with

[nodejs v14.17.0](https://nodejs.org/)

[Angular](https://angular.io/)

[Angular Material](https://material.angular.io/)

[D3.js](https://d3js.org/)

## See also

[budget - Backend code](https://github.com/fsv2860/budget-backend)
