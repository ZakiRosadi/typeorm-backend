# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


# API DOCUMENTATION

## USER
#### REGISTER
* URL : http://localhost:5000/api/v1/register
* METHOD : `POST`
* INPUT :
```json
{
"name" : "akbar",
    "address" : "jalan kerumah akbar",
    "gender" : "laki laki",
    "username" : "akbar123",
    "password" : "root"
}
```
#### LOGIN
* URL : http://localhost:5000/api/v1/login
* METHOD : `POST`
* INPUT :
```json
{
"username": "akbar123",
"password" : "root"
}
```
* RETURN :
```json
{
 "message": "successfully login",
"token": // you will get token encryption
}
```

## PEMILU 
#### GET ALL DATA OF PEMILU
* URL : http://localhost:5000/api/v1/pemilu
* METHOD : GET

#### POST DATA OF PEMILU
* URL : http://localhost:5000/api/v1/pemilu
* METHOD : POST
* RETURN :
```json
{
 "message": "sucessfully insert new data",
    "data": {
        "title": "pemilu 2024",
        "image": "https://res.cloudinary.com/gambar.png",
        "author": "akbar123",
        "user": {
            "id": 1,
            "name": "akbar",
            "address": "jalan kerumah akbar",
            "gender": "laki laki",
            "username": "akbar123",
            "password": "$2b$10$IfXQ8gK/K2VQeLDxQygbPu/rdCM6MJrK0017/a3bagns2WYioBQl2"
        },
}
```

## PASLON
#### GET ALL PASLON
* URL : http://localhost:5000/api/v1/paslon
* METHOD : `GET`
* RETURN :
```json
{
data : //you will get all data
}
```
#### INPUT PASLON
* URL : http://localhost:5000/api/v1/paslon
* METHOD : `POST
* INPUT :
```json
{
// colomn input you have to fill out
}
```

#### UPDATE DATA OF PASLON
* URL : http://localhost:5000/api/v1/paslon
* METHOD : `PATCH`
* INPUT :
```json
{
// input data you need to update
}
```

#### DELETE DATA OF PASLON
* URL : http://localhost:5000/api/v1/paslon
* METHOD : `DELETE`
* FIND THE ID YOU NEED TO DELETE


## PARTAI
#### GET ALL DATA OF PARTAI
* URL : http://localhost:5000/api/v1/partai
* METHOD : `GET`
* RETURN
```json
{
// you will get all data
}
```

#### POST DATA OF PARTAI
* URL : http://localhost:5000/api/v1/partai
* METHOD : `POST`
* RETURN
```json
{
// coloumn input you have to fill out
}
```

##### UPDATE DATA OF PARTAI
* URL : http://localhost:5000/api/v1/partai
* METHOD : `PATCH`
* RETURN
```json
{
// input data you need to update
}
```

#### DELETE DATA OF PARTAI
* URL : http://localhost:5000/api/v1/partai
* METHOD : `DELETE`
* FIND THE DATA YOU NEED TO DELETE

## VOTER

#### GET ALL DATA OF VOTER
* URL : http://localhost:5000/api/v1/voter
* METHOD : `GET`
* RETURN :
```json
{
//you will get all data
}
```

#### POST DATA OF VOTER
* URL : http://localhost:5000/api/v1/vote
* METHOD : `POST`
* RETURN :
```json
{
// you have to vote your choosen paslon
}
```

## NOTE
REMEMBER. THIS API SERVICES ARE ABLE TO USE FOR YOUR NECESSITY. HOWEVER, YOU NEED TO UNDERSTAND THAT THOSE SERVICES WILL BE UPDATED FROM TIME TO TIME. IF YOU FACE SOME ISSUES REGARDING USING MY SERVICES,
YOU CAN BACK LATER TO UTILIZE
























