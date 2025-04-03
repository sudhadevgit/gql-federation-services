# Step 1: Use the official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that the GraphQL server will run on
EXPOSE 4000

# # Step 7: Build the application (if using TypeScript or need to run build step)
# RUN npm run build

# Step 8: Command to run the application
CMD ["npm", "start"]
