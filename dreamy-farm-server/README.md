# Dreamy-farm-server

The api server for dreamy farm website

## 1. Packages used in this project

| Library Name                                                                            | Purpose                                                                             |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [prettier](https://www.npmjs.com/package/prettier)                                      | Make your code beautiful                                                            |
| [lint-stage](https://github.com/okonet/lint-staged)                                     | Run linters against staged git files and don't let hankey slip into your code base! |
| [husky](https://github.com/typicode/husky)                                              | Husky improves your commits and more woof!                                          |
| [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) | Convert jsx syntax                                                                  |
| [babel](https://babeljs.io)                                                             | Convert jsx syntax                                                                  |

## 2. How to works with this repo

- **Step 1. Clone this repo (if not yet)**

  NOTE : Ssh method (recommended)

  ```
  git clone git@github.com:sontungexpt/dreamy-farm-server.git
  ```

- **Step 2. Make sure you are in develop branch**

  ```
  git branch
  ```

  NOTE: If the current branch is not develop then you can use the command below to switch to develop branch

  ```
  git checkout develop
  ```

  NOTE: Make sure that you are in the folder that has the .git folder, if not
  then you can use the command cd to change the directory to the folder that has the .git folder

- **3. Create a new branch from develop branch**

  ```
  git checkout -b <your-branch-name>
  ```

  NOTE: The branch name should be related to the feature you are working on.

- **4. Start working on your branch and push it to remote when you finished some new feature or end of day**

  NOTE:For the first time you create a new branch and push it to remote do this

  ```
  git push -u origin <your-branch-name>
  ```

  After that you can push it with the shorter syntax

  ```
  git push
  ```

  NOTE: The -u flag help you to set up the upstream branch. After that, you can use git push without any flag.

- **5. Create a pull request to develop branch**
