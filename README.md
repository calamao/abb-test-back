## Intro
This is an assignment from [ABB Digital Accelerator](https://new.abb.com/products/robotics/es/customer-innovation-center) in the search for a fullstack developer in the React-NodeJS stack.

**This is the backend repository** of the assigment.

---

Both repositories (Frontend and Backend) can be found here:
* ⚙️**Backend repo** go to [backend repo](https://github.com/calamao/abb-test-back)
* 🌏**Frontend repo** go to [web-app repo](https://github.com/calamao/abb-test-front)

---


**🚀 Fast quickstart based on:** [Express TypeScript Boilerplate](https://github.com/sidhantpanda/docker-express-typescript-boilerplate)

Check out the link to see all the features available in the boiler plate.

---

## Architecture comments
This project makes use of `MongoDB` to store data, `express` as api framework and `Docker` for the runtime. Once running the project you can expect these services/features running:
* 🌏**API Server** running at `http://localhost:3001`
* ⚙️**Swagger UI** at `http://localhost:3001/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

---

## Install

#### 1. Clone this repo

```
$ git clone git@github.com:calamao/abb-test-back.git your-app-name
$ cd your-app-name
```

#### 2. Install packages
This step is not necessary if you just want to start using the server via Docker.

```shell
npm i
```

## Start with docker-compose (Recommended)

This will run the api and the DB at the same time:
```shell
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

---

## Next Steps
For the next steps check the 'unified' next steps section in the corresponding web-app repository which consumes this backend:
* 🌏**Web-app repo** go to [web-app repo](https://github.com/calamao/abb-test-front)


---
## Development

### Start manually
For this step to work you need to run your `MongoDB` instance separately (check in the Development section) and previously execute the `npm i` command

```
$ npm run build && npm run start
```

### Start `MongoDB` and `API` separately
If you want to have your `MongoDB` instance running in the background
```shell
docker-compose -f docker-compose.dev.yml up -d --force-recreate
```

And then just run the API server separately:
```shell
docker-compose up
```

---

## License

This project is licensed under the MIT license, Copyright (c) 2019 Maximilian Stoiber.
For more information see `LICENSE.md`.
