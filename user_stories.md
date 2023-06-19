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
  - When I click this button a modal opens, with all of my lists as well as a create new list button. - When I click this button I can add a stock to one or more watchlists.
  - If I go back to my dashboard page the menu button on each list will let me update the name and/or icon of my watchlist individually.
    - Clicking on the menu button will open a dropdown menu to choose which option I want.
  - The button changes to have a checkmark if the stock is on a watchlist I have made.
    - Clicking on this button again opens the same menu but will then be how I can remove a stock from the list detailed below.
  - To remove a stock from a watchlist I can click the same button and deselect the wathlist, and this will remove it from the watchlist.
    - Removing a stock from a watchlist does not require a confirmation dialogue and based entirely on the state of the checkbox next to each watchlist.

### Deleting Watchlists

- As a logged in user, I can delete my lists on my dashboard page.
  - To delete a watchlist, I can click on the three dot menu icon on the watchlist I want to delete. This will open a dropdown menu with 3 options. One of the options is to delete the watchlist.
  - When I click on the delete option, a modal opens and asks for confirmation on the deletion of the list. You can only delete one list at a time.

## Dashboard & Portfolio

### Create (Buying stocks)

- As a logged in user, I can buy stocks from the stock detail page.
  - When I buy a stock it will be added to my portfolio.
    - I click on a button on the stock detail page in the top right corner that says "buy". This opens a modal where I can buy the stock, inputing the basic information for buying a stock.
    - The user can buy as many of the companies stock at once as long as they have the cash to do so.
    - There will be a confirmation window that pops up upon succesfull completion / submission of the purchasing form.
  - When I buy a stock its performance will be added to my overall portfolio performance.
    - This will show up on the top of the my dashbord under portfolio performance.
  - When I buy a stock, I then have the option to add it to a watchlist.
    - When I buy a stock there will be a button to add it to a watchlist.
  - Purchasing a stock will lower my available cash, and increase my portfolio value.
  - When I buy a stock it is added to the top part of the watchlists box in a separate box named Stocks. If this is my first stock, it will add the box, if it is not my first stock bought it will just add to that list. It will display the tiny version of the summary, and the #shares owned.

### Delete (Sell stocks)

- As a logged in user, I can sell stocks from my portfolio page.
  - When I sell a stock it will be deleted from my portfolio, unless I only sold a few shares that I own.
    - The user can sell stocks from either clicking a button on the stock detail page that says "sell", or they can sell using the button in their dashboard.
    - If they are selling through the stock detail page, they can only sell that companies stock.
    - If they are selling through their dashboard they can pick which stocks they want to sell and do it all at once.
    - They will complete the input fields on the modal that opens after clicking sell stocks. Once this is compelte, they will click submit and they will be prompted to confirm their actions.
  - When I sell a stock, it will increase my cash value, and decrease my portfolio value.
  - If I sell all of my stock in a company, I will no longer be able to add it to my favorites.
  - If I sell all of my stock in a company, the stock ticker will go away from my list of owned stocks, but will not leave any watchlists it may be on.

### Read (View Portfolio / Dashboard)

- As a logged in user, I can view my dashboard by clicking the home button in the top left corner of the screen. (always visible)
  - When I open my dashboard I can see the following:
    - I can see my portfolio performance, my watchlists, an edit dashboard button, my notes, any modules I have selected.
  - I can customize my dashboard to have any modules I want from the selection available. The only one that is constant is portfolio performance and notes.
  - I can see my stock list and purchase / sell from here if I choose to do so.
  - I can see my watchlists and edit them from this page as well. A modal opens when I click one.

### Update (Edit Notes, Edit dashboard)

- As a logged in user, I can view my notes on my dashboard and edit them.
  - I can assign each note to a stock
  - I click a button that says add note at the bottom of the dashboard. This opens a modal where I can input the information for the note.
  - I can input a stock symbol to attach the note to a certain stock.
- As a logged in user, I can customize my dashboard to have as little or as much as possible.
  - There is an edit dashboard button that will bring me to the edit menu.

## Search

### Blended CRUD (Search with API)

- As a logged in user I can search using the search bar at the top of the screen.
  - When I use the search bar it will hit an API request to give me the details of the stock I requested.
  - BONUS: When I use the search bar it auto populates with stocks that exist with the letters used (starting after 2 characters).
    - Eg. I type AAP it will show me AAPL in a drop down menu and I can click that.

## Asset Stock Details

### Blended CRUD (Stock details Page)

- As a logged in user I can search using the search bar, click on a certain stock in my watchlist, click on a certain stock in my portfolio, to bring me to the stock detail page.
  - When I land on the detail page I can see the stock performance
  - I can see all of the details including key metrics, basic company information, etc.
  - I can see the buy / sell module based on if I currently own any of the stock or not.
  - I can see / edit / create / delete notes for each stock
