// Only executed on the server
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { image, helpers } from 'faker';
import { Employees } from '../Imports/collections/employees';
import * as consts from '../Imports/constants';

Meteor.startup(() => {
    // Great place to generate data
    // Check to see if data exist in the collection (so we won't reproduce fake data)
    const numberRecords = Employees.find({}).count();
    console.log(`Number of records : ${numberRecords}`);
    if (!numberRecords) {
        // Generate fake data
        _.times(5000, () => {
            const { name, email, phone } = helpers.createCard();
            Employees.insert({
                name,
                email,
                phone,
                avatar: image.avatar()
            });
        });
    }

    Meteor.publish('employees', (perPage) => {
        return Employees.find({}, { limit: perPage });
    });
});
