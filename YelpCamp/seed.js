const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
data = [
  {
    name: "Cloud's Rest",
    image:
      "https://cdn.pixabay.com/photo/2018/05/02/18/36/tent-3369328_1280.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert Mesa",
    image:
      "https://cdn.pixabay.com/photo/2013/08/12/16/21/desert-171825__340.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Canyon Floor",
    image:
      "https://cdn.pixabay.com/photo/2017/09/12/01/45/utah-2741027__340.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

const seedDB = () => {
  //Remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("REMOVED ALL CAMPGROUNDS");
      //Remove all comments
      Comment.remove({}, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("REMOVED ALL COMMENTS");
          // ADD NEW CAMPGROUNDS
          data.forEach(seed => {
            Campground.create(seed, (err, campground) => {
              if (err) {
                console.log(err);
              } else {
                console.log("added campground");
                // ADD NEW COMMENT
                Comment.create(
                  {
                    text: "This place is great but I wish there was internet",
                    author: "Homer"
                  },
                  (err, comment) => {
                    if (err) {
                      console.log(err);
                    } else {
                      campground.comments.push(comment);
                      campground.save();
                      console.log("Created new comment");
                    }
                  }
                );
              }
            });
          });
        }
      });
    }
  });
};
module.exports = seedDB;