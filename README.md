# NextJs Ecommerce Website
![](https://github.com/3bodymo/CornerMall/blob/main/demo.gif)

I've used NextJs to implement this website, and used tailwind for CSS.
For the database I used MongoDB.
When I developed this website I was interesting for security part, so if you found any vulnerability feel free to contact me.

## Requirements
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org/en/download/)
* [Next.js](https://nextjs.org/)
* [Tailwind](https://tailwindcss.com/)
* [MongoDB](https://www.mongodb.com/atlas/database)

## Setup
```shell
git clone https://github.com/3bodymo/CornerMall.git
cd CornerMall
npm install
```
### For database part:
* At first you have to create `.env` file in root directory of project.
* Get your MongoDB URI locally or from MongoDB atlas.
* At the end your `.env` file should be like this:
```shell
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secretString
MONGODB_URI=mongodb://anything-db-user:@anything.mongodb.net:27017/CornerMall?ssl=true
```
## Getting Started
```shell
npm run dev
```