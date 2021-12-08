# Cloud Computing Project


Cloud Computing Project using Springboot and Angular with AWS Elastic Beanstalk

### Installation:
- Clone this project https://github.com/superprokid/ADNews.git (FrontEnd)
- Open the project with IDE (Visual Studio Code,...)
- Open terminal in IDE:
- **nvm install**
-  After done:
  - **ng build**
- Open folder contains this project
- access **dist** folder
- access **ADNews** folder
- zip all the file in the folder( DO NOT ZIP THE FOLDER )
  - **ADNews.zip** this .zip  file is used to deploy to AWS Elastic Beanstalk

### Hosting AWS

**Host FrontEnd using Elastic Beanstalk**
  - We have to remember **API Link** information to connect to the BackEnd
- Open the project with IDE (Visual Studio Code,...)
  - Edit **categories.service.ts** and **news.service.ts** in (src/app)
- Using **API link** from the Backend and replace the URL in 2 files**Example**: URL= "http://springbootnews-env.eba-sexadeey.ap-southeast-1.elasticbeanstalk.com/news";
- Back to Amazone Web Service choose **Elastic Beanstalk**
  - Fill Application name
  - In Platform we choose **Tomcat**, **Tomcat 8.5 with Correto 8 running on 64bit Amazon Linux 2**
  - Select **Upload your code**
  - Choose file **ADNews.zip** we have built in the **Installation**
  - Select **Create Environment**
- After created you will have a link same same like this Eg: angular-env.eba-bmi4r9de.ap-southeast-1.elasticbeanstalk.com

### TEST
- Open your Browser
- You can see the home screen
- Press the icon on the top right corner
- Press **Đăng nhập** no need to log in account
  - You will able to see the admin page
- At the Admin page,you can add,delete,edit,… with call of the API we have created in the BackEnd
