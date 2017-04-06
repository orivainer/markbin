import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'bins.insert': function () {
        const userId = this.userId ? this.userId : null;
        return Bins.insert({
            createdAt: Date.now(),
            content: '',
            sharedWith: [],
            ownerId: userId
        });
    },
    'bins.remove': function(bin) {
        Bins.remove(bin);
    }
});

export const Bins = new Mongo.Collection('bins');