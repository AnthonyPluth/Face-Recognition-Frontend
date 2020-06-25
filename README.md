# Face Recognition


## What it does
This package will allow you to train and run facial recognition using your computer's webcam.

## Prerequisites
The frontend application requires the backend python api to be running on localhost:5000.  Please clone the [backend repo](https://gitlab.com/abpluth/face-recognition-backend) and start the service before running the frontend.

## Frontend Setup
```bash
git clone https://gitlab.com/abpluth/face-recognition-frontend.git
cd face-recognition-frontend
npm install
```

## Running the Frontend
```bash
npm start
```

## Testing
To run End-to-End testing:
```bash
npm run test:e2e
npm run coverage
```

To run unit tests:
```bash
npm run test:unit
```