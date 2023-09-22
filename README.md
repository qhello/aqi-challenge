# **Coding Challenge: Node.js**
## **Mini-Project: AIR QUALITY**

### **Objective**:
Develop a REST API using Node.js to fetch and present air quality information.

### **Background**:
Your task is to create a REST API that provides air quality information for the nearest city based on given GPS coordinates. This information is sourced from the [iqair API](https://www.iqair.com/fr/commercial/air-quality-monitors/airvisual-platform/api).

### **Instructions**:

#### **Setup**:
1. Register on [iqair](https://www.iqair.com/fr/dashboard/api) and generate your API KEY.
    - **Note**: It might take up to 5 minutes for the key to activate.
2. Test the air quality data using [this URL](https://api-docs.iqair.com/) with the parameters for longitude and latitude. Use tools like Postman to test the API.
3. Familiarize yourself with the `v2/nearest_city` endpoint from the iqair API.

#### **Development**:
1. Build a Node.js REST API. You can select your preferred framework.
2. Design an endpoint with a meaningful route name that accepts the parameters: longitude and latitude.
    - Within this endpoint, connect to the IQAIR API to fetch the "air quality" data for the provided coordinates. Refer to the "nearest_city" documentation for guidance.
    - The response should be structured as follows:

   ```json
   {
      "Result": {
         "Pollution": {
            "ts": "2019-08-04T01:00:00.000Z",
            "aqius": 55,
            "mainus": "p2",
            "aqicn": 20,
            "maincn": "p2"
         }
      }
   }

#### **Automation**:
1. Set up a CRON job to routinely (every minute) check the air quality for the Paris region, identified by the coordinates: latitude: 48.856613, longitude: 2.352222. Store these results in your database with the associated date and time.
2. (Optional) Create an endpoint to retrieve the date and time when the air quality in the Paris zone was at its worst, based on the results logged by your CRON job.

**Storage**: Ensure the fetched data is saved in a database. Choose a technology that you're comfortable with.

**Additional Requirements**:
- Provide thorough documentation for your project.
- Implement unit and integration tests for robustness.
