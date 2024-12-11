# file-uploader

>  [Live Website](https://file-uploader-production-ea4f.up.railway.app/)

## Preview

![app preview](image.png)

## Tools/Languages

[![JS](https://img.shields.io/badge/-JAVASCRIPT-000?style=for-the-badge&logo=javascript&logoColor=F0DB4F)](#)  [![HTML](https://img.shields.io/badge/-HTML-000?style=for-the-badge&logo=html5)](#)  [![CSS](https://img.shields.io/badge/-CSS-000?style=for-the-badge&logo=css3&logoColor=1572B6)](#)

[![NPM](https://img.shields.io/badge/-npm-000?style=for-the-badge&logo=npm)](#)  [![EXPRESS](https://img.shields.io/badge/-express-000?style=for-the-badge&logo=express)](#) [![EJS](https://img.shields.io/badge/-ejs-000?style=for-the-badge&logo=ejs)](#)
[![POSTGRES](https://img.shields.io/badge/postgres-black?style=for-the-badge&logo=postgresql&)](#)
[![PRISMA](https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma&)](#)

## Getting Started
- Create a `.env` file with all variables
- Make sure to have PostgreSQL

```
$ git clone git@github.com:immacheetah/file-uploader.git
$ cd file-uploader
$ npm install
$ npm prisma migrate dev
$ npm run start
```

## Learning Outcomes

- Use prisma to create a data relationship between models
- Create a file management system
 - Learn how to upload files to a cloud storage
 - Store files safely using personal buckets for the user
- Cement authentication practices using passport