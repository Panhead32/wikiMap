@echo off
start cmd /k "cd client && npm i && npm start" 
start cmd /k "cd server && npm i && npm run start" 
exit
