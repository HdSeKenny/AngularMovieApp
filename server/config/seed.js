
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

    var Thing = require('../api/thing/thing.model');
    var User = require('../api/user/user.model');
    var Blog = require('../api/blog/blog.model');
    var Movie = require('../api/movie/movie.model');

    var Comment = require('../api/comment/comment.model');



  Thing.find({}).remove(function() {
     Thing.create({
      name : 'Development Tools',
      info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
     }, {
      name : 'Server and Client integration',
      info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
     }, {
      name : 'Smart Build System',
      info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
     },  {
      name : 'Modular Structure',
      info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
     },  {
      name : 'Optimized Build',
      info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
     },{
      name : 'Deployment Ready',
      info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });

  });

  User.find({}).remove(function() {
    User.create({
     provider: 'local',
     name: 'Test User',
     email: 'test@test.com',
     password: 'test',
     birthDay:'20/12/1991',
     username:'test',
     gender: 'Male',
     phoneNo: '123456789'
   }, {
     provider: 'local',
     role: 'admin',
     name: 'Admin',
     email: 'admin@admin.com',
     password: 'admin',
     birthDay:'01/10/1992',
     username:'admin',
     gender: 'Female',
     phoneNo: '123456789'
   }, function() {
       console.log('finished populating users');
      }
    );
  });

  Comment.find({}).remove(function() {
      Comment.create({
        
      });
   });
     
  Blog.find({}).remove(function() {
        Blog.create({
          title : 'The example title',
          body: 'Example content...',
          write_by: 'Kuan Lu'    
         });
     });


 Movie.find({}).remove(function() {
      Movie.create(  {
        name : 'Brave heart', 
        actor: 'Princess Isabelle', 
        director: 'William Wallace', 
        drama: 'War',
        imageurl: 'assets/images/image1.jpg'
      },  
      {
        name: 'Titanic', 
        actor: 'Kate Winslet', 
        director: 'James Cameron', 
        drama: 'Love',
        imageurl: 'assets/images/image2.jpg'
      }, 
       {
        name: 'Gone Girl', 
        actor: 'Nick Dunne', 
        director: 'David Fincher', 
        drama: 'Mistery',
        imageurl: 'assets/images/image3.jpg'
      });
   });

