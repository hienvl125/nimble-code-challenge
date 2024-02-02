# Nimble Code Challenge

## Frontend (FE)

### Why Next.js for FE?
Next.js is a popular and powerful server-side rendering framework for React applications, providing the ability to build dynamic UI applications efficiently.

### Overview
- **Node:** v20.11.0
- **Npm:** v10.2.4
- **Next.js:** v14.x

### How to Set Up the FE App?
1. Install dependencies: `npm install`

2. Export necessary environment variables:
   ```bash
   export NEXTAUTH_SECRET=my-secret
   export NEXTAUTH_URL=http://localhost:3000
   ```

3. Start the Next.js application: `npm run dev` and visit `http://localhost:3000`

## Backend (BE)

### Why Nest.js for BE?

While being familiar with Golang and Ruby on Rails, Nest.js is chosen for its integration with Puppeteer, offering a powerful solution for website scraping.

### Overview
- **Node**: v20.11.0
- **Npm**: v10.2.4
- **Nest**.js: v10.x
- **Database**: Postgres 12

### How to Set Up the BE App?
1. Install dependencies: `npm install`

2. (Optional) Install Nest CLI globally: `npm i -g @nestjs/cli`

3. Export necessary environment variables:
   ```bash
   export DB_USER=postgres
   export DB_PASSWORD=password
   export DB_HOST=localhost
   export DB_PORT=5432
   export DB_NAME=your_db
   export JWT_SECRET=your_jwt_secret
   export PORT=your_port_number
   export CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. Start the Nest.js application: `npm run start:dev`

## Areas for Improvement
### Storing HTML Pages during Scraping:

Discuss the approach to store HTML pages for each keyword during the scraping process.

### Performance in Keyword Scraping:

Address concerns related to the performance of keyword scraping. Evaluate and implement optimizations for a smoother process.

### Unit Testing:
Plan and implement unit tests to cover various cases, ensuring the code meets quality standards.
