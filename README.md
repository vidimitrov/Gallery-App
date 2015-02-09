# Gallery App
Simple express api with Ionic mobile app for managing user's gallery

## API (with Express, Mongoose and PassportJS)
- Supports user authentication

 **auth/login** - Log user by providing username and password

 **auth/signup** - Register user by providing username and password

 **auth/logout** - Logout user

- Supports user's gallery management

 **api/users/:userId/images** - Gets all images of the user

 **api/users/:userId/uploadImage** - Upload image to the user's gallery

## API (with Express and Seneca micro services)
- In progress

## Recent changes
1. Refresh button added to gallery to fix the bug with refreshing the images

## TODO
1. Fix the functionality to upload files from the user file system
2. Refactor the code
3. Add unit tests

## How to use
- The API is currently deployed on OpenShift - http://galleryappapi-vdsystem.rhcloud.com/
- The Mongo database is currently deployed on MongoLab

- You can just download the GalleryApp.apk install it on a mobile devise and test
