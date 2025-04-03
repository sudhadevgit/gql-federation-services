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

4. **Docker Install**
        
        docker-compose build
        docker-compose up

        Check if http://localhost:4000/  is up and running, jump to Step 7

4. **Manual Install**
        
        npm install
        (run this in gql-federation-services directory)

    
    **OR** To run each service when it has its own set of dependencies. Follow the steps below for each service:

        cd account-service
        npm install

        cd devices-service
        npm install

        cd gateway-service
        npm install

5. **Run Services**
    All three services can be started independently, but for development convenience, using concurrently script to start all three servers using

        npm start

    **OR** to run services independently:

        cd account-service
        node index.js

        cd devices-service
        node index.js

        cd gateway-service
        node index.js

6. **Run tests**
    
        npm test 

7. **Access the GraphQL Playground**
   Open your browser and navigate to the Federation Service's URL:

        http://localhost:4000

  You can now run queries in the Apollo GraphQL Playground.

Example Queries

        Above project is using below static data for initial fetch:
        Accounts = [
            { id: '1234', name: 'Sudha Rani', email: 'sudha.rani@example.com', phone: '123-456-7890' }
        ];
        
        Devices = [
            { id: '5678', name: "Sudha's iPhone", type: 'smartphone', status: 'active', accountId: '1234' },
            { id: '91011', name: "Sudha's Laptop", type: 'laptop', status: 'active', accountId: '1234' }
        ];

Get all Accounts with its devices:

        query GetAccounts {
            getAccounts {
                id
                name
                email
                phone
                devices {
                    id
                    name
                }
            }
        }
    Get an Account and associated Devices:

        query GetAccountWithDevices {
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

            query GetDeviceWithAccount {
                getDevice(id: "5678") {
                    id
                    name
                    type
                    status
                    account {
                        id
                        name
                    }
                }
            }

8. **Project Structure**:   Project is structured as follows:

        gql-federation-services
        ├── account-service/
        │   ├── index.js           # Apollo Server for Account Service
        │   └── schema.js          # Account service GraphQL schema
        ├── devices-service/
        │   ├── index.js           # Apollo Server for Devices Service
        │   └── schema.js          # Devices service GraphQL schema
        ├── gateway-service/
        │   ├── index.js           # Apollo Gateway for Federation Service
        └── README.md
   
