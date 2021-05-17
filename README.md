# App users-crud-front
Simple CRUD UI for users management.
This application allows:

1. list all user
1. find a user by it's ID number
1. create a new user
1. update an existing one
1. list all user
1. delete one user
1. delete all users

## How To Download this version and execute?

Steps (assuming you already have git and yarn):

1. Go to root folder where you want the project it's located and run
```
git clone https://github.com/kliver98/users-crud-front
```
1. Open folder downloaded in desired code editor and run on the terminal:
```
yarn install
```
1. Lastly to run the project type on the terminal:
```
yarn serve
```
<span style="color: red">*</span> In case of error to not be able of connect to database locally (you must have run backend project) just copy the content of **_.env.production_** with **_.env.development_** and repeat from step 3


## How To Update your fork repository if forked

Run the following commands:

```bash
  git remote add upstream git@github.com:kliver98/users-crud-front.git
  git pull upstream main
```

If you have altered it, you then need to rebase it.

```bash
  git rebase upstream/main
````
