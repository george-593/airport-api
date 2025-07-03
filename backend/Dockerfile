FROM node:20

# Set working directory
WORKDIR /backend

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 5050

# Start backend
CMD ["npm", "start"]