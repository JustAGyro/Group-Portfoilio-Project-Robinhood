# User Stories

# Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the lob-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  - When I'm on either the `/signup` or `/login` pages:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to a page displaying recent FauxTweets.
      - So that I can easily log out to keep my information secure.

## Watchlists

### Create Watchlists

- As a logged in user, I want to be able to create a new watch list.
  - When im on my dashboard page:
    - I can see on the right hand side of the page, a list of watchlists I have created.
    - I can click the + to create a new list, a modal pops up and says to enter a list name with (cancel) (create list) buttons. It also asks me to change the icon (there is a default icon).
    - Once I click create it adds it to the box on the right hand side of the page, as an empty list.

### Viewing Watchlists

- As a logged in user, I can view my lists on the right hand side of the page.
  - I can expand or contract each list individually.
  - When I expand a list it shows the stocks and a tiny version of their summarys under the list name.
  - When I contract each list it will hide all of this information.
  - There is also a menu button on each list that gives you the options to edit list, delete list, and move list (within the box that contains all of my lists).

### Updating Watchlists

- As a logged in user, I can update my lists by searching for stocks.
  - I can search for a stock using the search bar in the top of page that is always present.
  - Each stock detail page has a button on the right top part of the page that says add to list
  - When I click this button a modal opens, with all of my lists as well as a create new list button.
  - If I go back to my dashboard page the menu button on each list will let me update the name and/or icon of my watchlist individually.
  - The button changes to have a checkmark if the stock is on a watchlist I have made.
  - To remove a stock from a watchlist I can click the same button and deselect the wathlist, and this will remove it from the watchlist.

### Deleting Watchlists

- As a logged in user, I can delete my lists on my dashboard page.
  - To delete a watchlist, I can click on the three dot menu icon on the watchlist I want to delete. This will open a dropdown menu with 3 options. One of the options is to delete the watchlist.
  - When I click on the delete option, a modal opens and asks for confirmation on the deletion of the list. You can only delete one list at a time.

## Dashboard & Portfolio

### Create (Buying stocks)

- As a logged in user, I can buy stocks from the stock detail page.
  -When I buy a stock it will be added to my portfolio.
  -When I buy a stock its performance will be added to my overall portfolio performance.
  -When I buy a stock, I then have the option to add it to my favorites.
  -Purchasing a stock will lower my available cash, and increase my portfolio value.
  -When I buy a stock it is added to the top part of the watchlists box in a separate box named Stocks. If this is my first stock, it will add the box, if it is not my first stock bought it will just add to that list. It will display the tiny version of the summary, and the #shares owned.

### Delete (Sell stocks)

- As a logged in user, I can sell stocks from my portfolio page.
  - When I sell a stock it will be deleted from my portfolio, unless I only sold a few shares that I own.
  - When I sell a stock, it will increase my cash value, and decrease my portfolio value.
  - If I sell all of my stock in a company, I will no longer be able to add it to my favorites.
  - If I sell all of my stock in a company, the stock ticker will go away from my list of owned stocks, but will not leave any watchlists it may be on.

### Read (View Portfolio / Dashboard)

- As a logged in user,
