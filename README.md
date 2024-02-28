# Tech Blog

## Description

This is a CMS-style blog site where developers can publish their blog posts and comment on other developers' posts. This app follows the MVC paradigm and uses EJS as the templating language, Sequelize as the ORM, and the express-session and passport.js npm packages for authentication.

## Usage

Make sure you create a .env file to store environment variables for the mySQL database and session-secret. See .env.Example for an example. To use this app, clone the repository and run `npm install` to install the required packages. Run `npm run schema` to create the database. Then run `npm start` to start the server.

* New users can register for an account.
* Click on the login link to log in.
* Visit the homepage to see all blog posts.
* Click on a post title to view the full post and comments.
* Add a comment to an existing post.
* Click on the dashboard link to go to your dashboard.
* From the dashboard, existing users can create, edit, and delete their own posts.
* Option to delete your user profile.

## Built With

* HTML, CSS, JavaScript
* Node.js
* Express.js
* MySQL
* Sequelize
* EJS
* express-session
* passport.js
* bcrypt
* axios

## Credits

This app was created by [CookingMeister](https://github.com/CookingMeister) on criteria from the University of New Brunswick's [edX Coding Bootcamp](https://unb.ca/cel/bootcamps/coding.html) program.

## License

This project is licensed under the MIT license. See LICENSE file for details.

## Acknowledgments

* [npm express-session documentation](https://www.npmjs.com/package/express-session)
* [npm passport.js documentation](https://www.npmjs.com/package/passport)
* [npm bcrypt documentation](https://www.npmjs.com/package/bcrypt)
* [npm dotenv documentation](https://www.npmjs.com/package/dotenv)
* [npm Sequelize documentation](https://www.npmjs.com/package/sequelize)
* [npm mySQL2 documentation](https://www.npmjs.com/package/mysql2)
* [npm EJS documentation](https://www.npmjs.com/package/ejs)
* [npm axios documentation](https://www.npmjs.com/package/axios)
