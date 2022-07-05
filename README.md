
  

[![Netlify Status](https://api.netlify.com/api/v1/badges/f6db30a8-fad7-4382-a2e7-430d37e9f979/deploy-status)](https://app.netlify.com/sites/cheerful-chaja-0cff36/deploys)

## DYNAMIC FORM LOADER APPLICATION

The live version is online here : https://cheerful-chaja-0cff36.netlify.app


### Local Development  

First, you must create file ```.env.local``` to store dev environment variable, you can copy it from ```.env.local.example```, then fill the value of API_URL (in this case it should be : ```https://ulventech-react-exam.netlify.app/api/form```)

  

Then open your terminal and run the development server:

  

```bash

yarn dev

```

  

Open your browser and point it to ```http://localhost:3000```

  

### Build Docker Image

  

Simply just run standard docker build script to build the image below :

  

```bash

docker build -t dynamicform .

```

  

Then you run your docker image, don't forget to pass the environment variable argument :

  

```bash

docker run -p 3000:3000 --env API_URL=https://ulventech-react-exam.netlify.app/api/form dynamicform

```

  

### Using Docker Compose

  

This project is prepared and ready for any docker orchestration, currently we can use docker-compose to deploy this application. Simply just edit the ```docker-compose.yml``` file and adjust the environment variable needed.

  

Then we can run :

```bash

docker-compose up

```

  

it will expose port ```:3000```

  

## Tech Notes

  

This project currently use these stack :

1. NextJS

2. Typescript

3. Material-UI

  

State management implemented currently only the ```useState()``` from react-hooks (https://reactjs.org/docs/hooks-state.html)

  

### Future Development

1. Implement Redux for state management (still learning)

2. Improve user experience and styling

3. Optimize everything (from feedbacks, should be a lot)

  

Thank you and stay healthy!