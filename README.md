# sale-scraper
#### Get first dibs on sale items with the sale scraper and save your favorites to one spot. 

* [Deployed](https://frozen-falls-35377.herokuapp.com/)
* [Repository](https://github.com/jshou403/sale-scraper)

## How The App Works

This full stack application uses the [Cheerio] node package to scrape a website and [Mongoose] to model the website data that is to be sent to the [MongoDB]. This data is then stored in the database and is retrieved via API calls and sent to be rendered at the "/" route for the user to see. The user then has the option to "save" an item and can view all saved items at the "/saved" route. At this route, the user can unsave or delete the saved item. 

## Future Developments 
* Add Comment/Note section for users

## Technologies Used
* Javascript
* JQuery
* Handlebars
* Node.js
* Express.js
* Cheerio
* MongoDB
* Mongoose ORM

## Developer
Jacalyn Shou 
* [Github](https://jshou403.github.io/)
* [LinkedIn](https://www.linkedin.com/in/jacalyn-shou/)
* [Portfolio](http://www.jacalynshou.com/)