import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import {Contacts} from "../../api/contact/Contacts";

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addContact = data => {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Contacts.collection.insert(data);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contact.');
    Meteor.settings.defaultContacts.forEach(data => addContact(data));
  }
}
