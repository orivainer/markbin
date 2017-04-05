import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import validUrl from 'valid-url';

Meteor.methods({
    'links.insert': function (url) {
        check(url, Match.Where(url => validUrl.isUri(url)));

        //If we got here (no exception was thrown) we are ready to save the url
        const token = Math.random().toString(36).slice(-5);
        Links.insert({ url, token, clickes: 0 });
    }
});

export const Links = new Mongo.Collection('links');