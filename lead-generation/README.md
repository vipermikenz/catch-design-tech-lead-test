**Lead Generation Docker Technical Guide**

**Setup and Run**

1.  Clone the repo and navigate to the directory:

sh _(in favourite terminal)_
git clone \<your-repo-url\>
cd \<your-repo-directory\>

2.  Ensure your directory structure matches:
\<your_base_dir\> \\lead-generation\\

├── backend

│ └── Dockerfile

├── frontend

│ └── Dockerfile

└── docker-compose.yml

_only a sample of the dir structure showing the Main docker file locations_


4.  Build and start containers:
- Start up Docker Desktop
- _docker is available here: https://www.docker.com/_
- inside your favourite terminal navigate to 
- cd \\<your_base_dir\> \\lead-generation\\ _where you downloaded the git repo to_
- _the following command will start the docker up_
- docker-compose up \--build
- in the terminal if you <ctrl><c> the docker should stop or you can stop it in the desktop app.

**Access and Test**
1.  Frontend: <http://localhost:8080>
2.  phpMyAdmin: <http://localhost:8081>
3.  Test the lead form:
    -   Fill out all fields in the form
    -   Submit and check browser console (F12) for logs
4.  View backend logs:
- sh _(in favourite terminal)_
- docker logs \<leadgenerationbackend-container-id\>

5. Run a simple performance test with jest
   - cd \\<your_base_dir\> \\lead-generation\\backend\
   - npm install
   - npm test
   - _you should see some output and test results_

**Cleanup**
1.  Stop and remove containers:
- sh _(in favourite terminal)_
- docker-compose down
2.  Remove all related Docker resources:
- sh _(in favourite terminal)_
- docker system prune -a _(Only if you want to remove all docker images off you machine)_
 -docker volume prune

**Additional Notes**

-   I used ESLint in VS Code for linting
-   Backend uses PM2 and Nodemon for process management and live-reloading of code so most code changes will recompile on adding them to the code base.
-   Check docker-compose.yml for service configurations
-   Frontend Dockerfile uses Node 22 and runs on port 8080
-   Backend Dockerfile uses Node 22 with additional build tools

**Next Steps**

1.  Implement MySQL writes for form submissions
2.  Set up OAuth for Node.js backend requests
