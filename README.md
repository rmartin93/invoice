# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![](../src/assets/screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://invoice-olive.vercel.app/)

## My process

### Built with

- React + Vite
- Vercel
- SupaBase
- SCSS
- Bootstrap 5.3
- Mobile-first workflow

### What I learned

I learned how to setup a basic backend with SupaBase. Users can authenticate with a Magic Link or GitHub.

I also added an additional screen that can be seen by clicking the link icon in the nav for an optional webhook.

The webhook is what will be used to send the invoice.

You can just create invoices without adding a webhook, but you will get an alert notifying you that a webhook must be added for the invoice info to be sent anywhere other than the database.
