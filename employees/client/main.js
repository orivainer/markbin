import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeList from './components/EmployeeList';

const App = () => {
  return (
    <EmployeeList />
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById("appContainer"));
});
