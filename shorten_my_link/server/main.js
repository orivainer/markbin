import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.startup(() => {
    Meteor.publish('links', function () {
      return Links.find({});
    });
  });
});

function onRoute(req, res, next) {
  const link = Links.findOne({ token: req.params.token });
  //If a token was found - redirection is needed
  debugger;
  if (link) {
    Links.update(link, { $inc: { clicks: 1 } }); // Increase the clicks fields by 1
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else { //If a token wasn't found, forward to our normal app
    next();
  }

}

const redirectMiddleware = ConnectRoute(function (router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(redirectMiddleware);