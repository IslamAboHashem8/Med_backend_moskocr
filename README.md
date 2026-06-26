Smart Medication Reminder System (Mock OCR Version)

Overview

This project is a backend system for a Smart Medication Reminder application. It simulates OCR results using predefined medicine data from a CSV dataset instead of performing real image recognition.

Features

* Upload prescription images
* Simulated OCR processing
* Medicine matching from dataset
* Automatic dose generation
* Medication tracking
* Notifications system
* Medication adherence prediction
* Drug alternatives lookup

Technologies Used

* Node.js
* Express.js
* MongoDB
* CSV Dataset

API Endpoints

Upload Prescription

POST /api/upload

Get Doses

GET /api/doses

Mark Dose as Taken

POST /api/taken/:id

Get Notifications

GET /api/notifications

Predict Adherence

POST /api/predict

Get Drug Alternatives

GET /api/drugAlternatives

Installation

npm install

Create a .env file:

MONGO_URI=your_mongodb_connection_string
PORT=3001

Run:

node index.js

Workflow

1. User uploads a prescription image.
2. Mock OCR returns predefined medicine data.
3. Dose schedules are generated.
4. Data is stored in MongoDB.
5. User can track doses and receive notifications.

Limitations

* OCR is simulated.
* Medicines are loaded from predefined dataset records.
* No authentication system.

Future Work

* Replace Mock OCR with EasyOCR.
* Add user authentication.
* Add mobile notifications.
* Deploy on cloud infrastructure.

Author

Eslam Mohamed
