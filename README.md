# Interview for QDrant

Implement a subscription order process for a cloud storage provider using React.

Description
The subscription order process has 3 steps:

1. Select subscription parameters:
   Duration: 3/6/12 Months (default: 12)
   Amount of gigabytes in a cloud: 5/10/50 (default: 5)
   Upfront payment: yes/no (default: no)
2. Payment data:
   Credit card number
   Credit card expiration date
   Credit card security code
3. Confirmation
   Summary of the selected subscription including total price and price per GB.
   Email of the user
   Terms and conditions agreement checkbox
   Confirmation button

Requirements
If the user selects upfront payment, the total price should be reduced by 10%
Current selected subscription and final price should be shown on every step
Subscription prices should be retrieved from https://cloud-storage-prices-moberries.herokuapp.com/prices
All parameters should be required
It should be possible to change steps by clicking on the Next or Back button.
Every step needs to be completed in order to see the next one.
Confirm button click handler should send data to the API endpoint https://httpbin.org/post

General
You can use Bootstrap or any other UI Library of your choice for styling. You are also allowed to use any npm packages that you see fit - no need to make everything from scratch.
TypeScript is more than welcome!

## Available Scripts

In the project directory, you can run:

### `npm install`

For installing all the npms

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
