# HacktivOverflow
---
## Usage
Make sure you have node.js and redis installed in your computer,and then run this command :
1. $ npm install
2. $ redis-server
3. $ redis-cli
4. $ ping
5. $ npm run dev

---
## Link Demo
#### [Demo](http://mini-wp-client.itsjoel.site/)


### Base url : http://mini-wp-server.itsjoel.site
---

#### User

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /login | POST | none | email(String) , password(string) | 200 | 404,500 |
| /register | POST | none | name(string) , email(string) , password(string) | 201 | 400,500 |
##### Login
* URL

  (base url)/login
* Method
 POST
* URL params
 none
* Data params
 Required : 
   * email=[String]
   * password=[string]
* Success Response 
 Status : 200
 Content :
 ```
 token: 'eyJhbGciOiJIUzabcdefghijklmnopqrstuvwxyz'
 ```
 * Error Response
  Status : 404
  content : 
```
{
    "message": "Wrong email/password"
}
```
---
##### Register
* URL

  (base url)/register
* Method
 POST
* URL params
 none
* Data params
 Required : 
   * email=[String]
   * password=[string]
* Success Response 
 Status : 201
 Content :
 ```
 {
    "user": {
        "full_name": "hello",
        "_id": "5dc82ef4cb35b84d6bf79583",
        "email": "hello@mail.com",
        "password": "<hashed password>",
        "createdAt": "2019-11-10T15:38:29.124Z",
        "updatedAt": "2019-11-10T15:38:29.124Z"
    }
}
 ```
 * Error Response
  Status : 400
  content : 
```
{
    "message": "Please make sure all required fields are filled"
}
```
---
#### Questions

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /articles | GET | none | none | 200 | 403,500 |
| /articles/:id | GET | none | title(string) , content(string) , image(file) | 201 | 403,400,500 |
| /articles/users | POST | none | none | 200 | 403,500 |
| /articles/ | POST | token | title(string) , content(string) , image(file) , status(string) | 200 | 403,401,400,500 |
| /articles/:id | PUT | token | none | 200 | 403,404,500 |
| /articles/upvote/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/downvote/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/answer/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/:id | DELETE | token | none | 200 | 403,404,500 |
##### Get all my article
* URL

  (base url)/article/user

* Method
 GET
* URL Params
 none
* Data Params
 none
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
[
    {
        "created_at": "2019-11-10",
        "featured_image": "<image url>",
        "status": "Draft",
        "_id": "5dc7f919258e6a284fc2c697",
        "title": "lagii",
        "content": "lagii2",
        "author": {
            "full_name": "bella",
            "_id": "5dc7f8e3258e6a284fc2c696",
            "email": "bella@mail.com",
            "password": "<hashed password>",
            "createdAt": "2019-11-10T11:47:48.037Z",
            "updatedAt": "2019-11-10T11:47:48.037Z"
        },
        "createdAt": "2019-11-10T11:48:41.733Z",
        "updatedAt": "2019-11-10T11:48:41.733Z"
    }
]
```
* Error Response
 Status : 403
 content : 
```
{
    "message": "Sorry this site is forbidden for you"
}
```
---
##### Create new article
* URL

  (base url)/article/user

* Method
 POST
* URL Params
 none
* Data Params
 Required : 
  * title=[string]
  * content=[string]
  * Optional : image=[file]
* Headers 
 token(jwt token)
* Success Response
 Status : 201
 content: 
```
{
    "article": {
        "created_at": "2019-11-10",
        "featured_image": "<image url>",
        "status": "Draft",
        "_id": "5dc8330acb35b84d6bf79587",
        "title": "lagii",
        "content": "lagii2",
        "author": "5dc7f8e3258e6a284fc2c696",
        "createdAt": "2019-11-10T15:55:54.085Z",
        "updatedAt": "2019-11-10T15:55:54.085Z"
    }
}
```
* Error Response
 Status : 400
 content : 
```
{
    "message": "Please make sure all required fields are filled"
}
```
---
##### Get all published article
* URL

  (base url)/article

* Method
 GET
* URL Params
 none
* Data Params
 none
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
[
    {
        "created_at": "2019-11-10",
        "featured_image": "<image url>",
        "status": "Published",
        "_id": "5dc7f919258e6a284fc2c697",
        "title": "lagii",
        "content": "lagii2",
        "author": {
            "full_name": "bella",
            "_id": "5dc7f8e3258e6a284fc2c696",
            "email": "bella@mail.com",
            "password": "<hashed password>",
            "createdAt": "2019-11-10T11:47:48.037Z",
            "updatedAt": "2019-11-10T11:47:48.037Z"
        },
        "createdAt": "2019-11-10T11:48:41.733Z",
        "updatedAt": "2019-11-10T11:48:41.733Z"
    }
]
```
* Error Response
 Status : 403
 content : 
```
{
    "message": "Sorry this site is forbidden for you"
}
```
---
##### Edit my article
* URL

  (base url)/article/user

* Method
 PUT
* URL Params
 Article id
* Data Params
 title=[string]
 content=[string]
 image=[file]
 status=[string]
  * enum: ['Published','Draft']
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
{
    "article": {
        "created_at": "2019-11-10",
        "featured_image": "<image url>",
        "status": "Draft",
        "_id": "5dc8330acb35b84d6bf79587",
        "title": "lagii",
        "content": "lagii2",
        "author": "5dc7f8e3258e6a284fc2c696",
        "createdAt": "2019-11-10T15:55:54.085Z",
        "updatedAt": "2019-11-10T15:55:54.085Z"
    }
}
```
* Error Response
 Status : 401
 content : 
```
{
    "message": "Data not exists / You trying to access data that you don't have permission on"
}
```
---
##### Delete my article
* URL
  
  (base url)/article/user

* Method
 Delete
* URL Params
 Article id
* Data Params
 none
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
{
    "article": {
        "created_at": "2019-11-10",
        "featured_image": "<image url>",
        "status": "Draft",
        "_id": "5dc8330acb35b84d6bf79587",
        "title": "lagii",
        "content": "lagii2",
        "author": "5dc7f8e3258e6a284fc2c696",
        "createdAt": "2019-11-10T15:55:54.085Z",
        "updatedAt": "2019-11-10T15:55:54.085Z"
    }
}
```
* Error Response
 Status : 401
 content : 
```
{
    "message": "Data not exists / You trying to access data that you don't have permission on"
}
```
---

#### Comments

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /comments/:article | GET | none | none | 200 | 404,500 |
| /comments/ | POST | token  | article(string) , description(string) | 201 | 400,500 |
| /comments/:id | PUT | token | description(string) | 200 | 400,500 |
| /comments/:id | DELETE | token | none | 200 | 400,500 |