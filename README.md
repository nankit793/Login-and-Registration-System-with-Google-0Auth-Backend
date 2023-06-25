# features already added on this template!
a) login, register, forgot password, verify user 
b) adding refresh token, and accesstoken to your cookies
c) admin login and registraion
d) admin, and user verification middlewares

1) You also need to clone the front end Part, This repo is backend only
clone this: https://github.com/nankit793/Login-and-Registration-System-with-Google-0Auth-FrontEnd
as for now front end templte is closed, we are working on it! it will be opened soon.
you can clone the admin side --> https://github.com/nankit793/adminTemplate
3) You also need to create 0Auth google credentials and search google credentials, you will find link on first, then go to credentials 
and then click on create 0Auth credentials, then follow next steps
add http://localhost:3000 on your Authorised JavaScript origins and
add http://localhost:5000/auth/google/callback on your Authorised redirect URIs
then you will be given  client secret and client ID which we will need to save in env file
4) you also need to edit .env file with the following values:
DATABASE_URI="your database url"
GOOGLE_CLIENT_ID="your google client id"
GOOGLE_SECRET="your google client secret"

JWT_ACCESS_TOKEN_SECRET="access token secret"
JWT_REFRESH_TOKEN_SECRET="refersh token secret"
COOKIE_VERIFY_SECRET="another secret"
you can generate these tokens from -  https://emn178.github.io/online-tools/sha256.html
