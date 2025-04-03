This is a simple GraphQL application built using Apollo Server and GraphQL Federation. It consists of three microservices:

1. **Account** Service: Manages account-related data (e.g., basic account information such as name, email, etc.).
2. **Devices** Service: Manages device-related data and associates devices with specific accounts.
3. **Gateway** Service: Acts as the GraphQL Gateway that federates the Account and Devices services, exposing a unified schema.
   

**Getting Started**
    To get the project up and running on your local machine, follow these steps:

1. **Prerequisites**

            Node.js (v14 or above)
            npm (v6 or above)

2. **Clone the Repository**

            clone in your local directory:
            git clone https://github.com/sudhadevgit/gql-federation-services.git
            cd gql-federation-services

4. **Install dependencies**
        
        npm install 
        (run this in gql-federation-services directory as its a simple project with services, with same dependencies)

    OR If each service has its own set of dependencies. Follow the steps below for each service:

        cd account
        npm init -y
        npm install

        cd devices
        npm install

        cd gateway
        npm install

5. **Run Services**
    Ideally all three services have to be started independently, but for development convenience for now, using concurrently script to start all three servers using

        npm start 

   Or to run services independently:

        cd account
        node index.js

        cd devices
        node index.js

        cd gateway
        node index.js

6.**Access the GraphQL Playground**
   Open your browser and navigate to the Federation Service's URL:

        http://localhost:4000

  You can now run queries in the Apollo GraphQL Playground.

Example Queries
Get Account Details:

        query {
            getAccount(id: "1234") {
                id
                name
                email
            }
        }
    Get Account and Associated Devices:

        query {
            getAccount(id: "1234") {
                id
                name
                email
                devices {
                    id
                    name
                }
            }
        }
    Get Device Details:

        query {
            getDevice(id: "5678") {
                id
                name
                accountId
            }
        }

7. **Run tests**
    
        npm test 

8. **Project Structure**:   Project is structured as follows:

        gql-federation-services
        ├── account/
        │   ├── index.js           # Apollo Server for Account Service
        │   └── schema.js          # Account service GraphQL schema
        ├── devices/
        │   ├── index.js           # Apollo Server for Devices Service
        │   └── schema.js          # Devices service GraphQL schema
        ├── gateway/
        │   ├── index.js           # Apollo Gateway for Federation Service
        └── README.md
   
