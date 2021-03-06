//Meteor.startup(function () {
  //process.env.MAIL_URL = Meteor.settings.MAIL_URL;
//});


Profiles.after.insert(function(userId, doc) {
  Users.update({
    _id: doc.userId
  }, {
    $set: {
      isDeveloper: true
    }
  });
});

Profiles.after.remove(function(userId, doc) {
  Users.update({
    _id: doc.userId
  }, {
    $set: {
      isDeveloper: false
    }
  });
});

Jobs.after.insert(function(userId, doc){
	var admin = Users.findOne({roles:"admin"});
	Email.send({
      to: getUserEmail(admin),
      from: FROM_EMAIL,
      subject: "New Job Posted - " + doc.title,
      text: "Job needs to be approved before it is live:\n\n" + 'http://jobs.supernet.org/jobs/'+doc._id
    });
});
