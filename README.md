Minimum Cost Calculation API
This is a simple Node.js application that calculates the minimum cost of transporting goods between several cities (C1, C2, C3) and a central location (L1). The calculation is based on the weight of the products at different locations and the distance between the cities.

Features
Takes product quantities as input.
Uses predefined stocks and distances between cities to compute the total transportation cost.
Returns the minimum cost to transport all products to a central location L1.
Requirements
To run this project, you need to have the following installed on your system:

Node.js
npm
Installation
Clone the repository to your local machine:

bash
Copy code
git clone <repository_url>
Navigate to the project folder:

bash
Copy code
cd project-folder
Install the required dependencies:

bash
Copy code
npm install
Usage
Start the server by running:

bash
Copy code
node index.js
The server will run on http://localhost:3000.

To calculate the minimum transportation cost, send a POST request to the /calculate_cost endpoint with the product quantities.

Request Example:
bash
Copy code
POST http://localhost:3000/calculate_cost
Content-Type: application/json
Request Body:
json
Copy code
{
  "A": 10,
  "D": 5,
  "H": 2
}
In this example, you are sending 10 units of product A, 5 units of product D, and 2 units of product H.

The response will contain the minimum transportation cost to move all products to location L1.

Response Example:
json
Copy code
{
  "minimum_cost": 100
}
Project Structure
app.js: Contains the Express server and main logic for calculating minimum cost.
stocks: Defines the quantity of stock for each product in different cities.
graph: Represents the distance between the cities and central location L1.
initializeWeights: Function that initializes the weights based on the product data provided in the request.
getCost: Function that calculates the cost based on the weight and distance between locations.
minCost: Core algorithm to compute the minimum transportation cost by visiting all cities efficiently.
Endpoint
POST /calculate_cost: Takes product quantities as input and returns the minimum transportation cost.
Request Body
Field	Type	Description
A, B, C, D, E, F, G, H, I	Number	Quantity of products to be transported
Example
json
Copy code
{
    "A": 5,
    "D": 3,
    "H": 1
}
Response
Field	Type	Description
minimum_cost	Number	Minimum cost to transport all goods
License
This project is licensed under the MIT License.

This README provides a comprehensive overview of how to set up, use, and understand the cost calculation API.
