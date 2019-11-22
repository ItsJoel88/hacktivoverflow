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
#### [Demo](http://hacktivoverflow.itsjoel.site/)


### Base url : http://server-overflow.itsjoel.site
---

#### User

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /login | POST | none | email(String) , password(string) | 200 | 400,500 |
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
  Status : 400
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
   * name=[string]
* Success Response 
 Status : 201
 Content :
 ```
{
    "user": {
        "_id": "5dd6bdda79077a2795e46fcc",
        "name": "user1",
        "email": "user1@mail.com",
        "password": "$2a$10$Hl/dqwfku8ErpMRdu0/3tOkva460PMM8DLHC1.8a0PVhrmwib7cda",
        "__v": 0
    }
}
 ```
 * Error Response
  Status : 400
  content : 
```
{
    "message": "email already exist"
}
```
---
#### Questions

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /articles | GET | none | none | 200 | 500 |
| /articles/:id | GET | none | none | 200 | 404,500 |
| /articles/users | POST | none | none | 200 | 404,500 |
| /articles/ | POST | token | title(string) , description(string) | 201 | 403,400,500 |
| /articles/:id | PUT | token | none | 200 | 403,404,500 |
| /articles/upvote/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/downvote/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/answer/:id | PATCH | token | none | 200 | 403,404,500 |
| /articles/:id | DELETE | token | none | 200 | 403,404,500 |
##### Get all my question
* URL

  (base url)/articles

* Method
 GET
* URL Params
  * query: date
    * options: ['newest' & '']
* Data Params
 none
* Headers 
 none
* Success Response
 Status : 200
 content: 
```
[
    {
        "answered": false,
        "upVote": [],
        "downVote": [],
        "_id": "5dd667c0fca39a311efaf2f5",
        "user": {
            "_id": "5dd40d0611fb9b5230f6c1e7",
            "name": "admin"
        },
        "title": "elbfqobgqipebgqwlkfnqfbqp",
        "description": "<p>eljq vlqebveq</p>",
        "createdAt": "2019-11-21T10:32:32.378Z",
        "updatedAt": "2019-11-21T10:32:32.378Z",
        "__v": 0
    }
]
```
---
##### Get one question
* URL

  (base url)/articles/:id

* Method
 POST
* URL Params
 none
* Data Params
 none
* Headers 
 none
* Success Response
 Status : 200
 content: 
```
{
    "article": {
        "answered": false,
        "upVote": [],
        "downVote": [],
        "_id": "5dd667c0fca39a311efaf2f5",
        "user": {
            "_id": "5dd40d0611fb9b5230f6c1e7",
            "name": "admin",
            "email": "admin@mail.com",
            "password": "$2a$10$dq3W2.kYmRFMPVfSWoTXLOMN13Lc3zeqdlhQXc12JvoXXvMuOdZy2",
            "__v": 0
        },
        "title": "elbfqobgqipebgqwlkfnqfbqp",
        "description": "<p>eljq vlqebveq</p>",
        "createdAt": "2019-11-21T10:32:32.378Z",
        "updatedAt": "2019-11-21T10:32:32.378Z",
        "__v": 0
    },
    "point": 0
}
```
* Error Response
 Status : 404
 content : 
```
{
    "message": "Article not found"
}
```
---
##### Create question
* URL

  (base url)/articles/

* Method
 POST
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
{
    "article": {
        "answered": false,
        "upVote": [],
        "downVote": [],
        "_id": "5dd6c33279077a2795e46fcd",
        "user": "5dd40d0611fb9b5230f6c1e7",
        "title": "Split an array without split method",
        "description": "How to split an array in javascript without split method ? Thanks in advance",
        "createdAt": "2019-11-21T17:02:42.516Z",
        "updatedAt": "2019-11-21T17:02:42.516Z",
        "__v": 0
    }
}
```
* Error Response
 Status : 400
 content : 
```
[
    "We need your description about the article"
]
```
---
##### Fetch user's questions
* URL

  (base url)/articles/user

* Method
 POST
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
        "answered": false,
        "upVote": [],
        "downVote": [],
        "_id": "5dd6c33279077a2795e46fcd",
        "user": {
            "_id": "5dd40d0611fb9b5230f6c1e7",
            "name": "admin",
            "email": "admin@mail.com",
            "password": "$2a$10$dq3W2.kYmRFMPVfSWoTXLOMN13Lc3zeqdlhQXc12JvoXXvMuOdZy2",
            "__v": 0
        },
        "title": "Split an array without split method",
        "description": "How to split an array in javascript without split method ? Thanks in advance",
        "createdAt": "2019-11-21T17:02:42.516Z",
        "updatedAt": "2019-11-21T17:02:42.516Z",
        "__v": 0
    }
]
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
##### upVote
* URL
  
  (base url)/articles/upvote/:id

* Method
 patch
* URL Params
 id
* Data Params
 to=[string]
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
{
    "article": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```
* Error Response
 Status : 403
 content : 
```
{
    "message": "You need to login first"
}
```
---
##### downVote
* URL
  
  (base url)/articles/downvote/:id

* Method
 post
* URL Params
 id
* Data Params
 to=[string]
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
{
    "article": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```
* Error Response
 Status : 403
 content : 
```
{
    "message": "You need to login first"
}
```
---

#### Comments

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /comments/:article | GET | none | none | 200 | 404,500 |
| /comments/ | POST | token  | article(string) , description(string) | 201 | 400,500 |
##### Get all comments
* URL
  
  (base url)/comments/:article

* Method
 get
* URL Params
 article
* Data Params
 none
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
[]
```
* Error Response
 Status : 404
 content : 
```
{
    "message": "Comment not found"
}
```
---
##### Create comments
* URL
  
  (base url)/comments/

* Method
 post
* URL Params
 none
* Data Params
  * article=['string']
  * description=['string']
* Headers 
 token(jwt token)
* Success Response
 Status : 200
 content: 
```
{
    "comment": {
        "answer": false,
        "_id": "5dd6c5dc79077a2795e46fcf",
        "article": "5dd6c33279077a2795e46fcd",
        "user": "5dd4a40ee004341346a6bdff",
        "description": "you can do looping and then just push each item into another temporary array",
        "createdAt": "2019-11-21T17:14:04.022Z",
        "updatedAt": "2019-11-21T17:14:04.022Z",
        "__v": 0
    }
}
```
* Error Response
 Status : 400
 content : 
```
[
    "Path `article` is required."
]
```
---