/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined', function() {
            for(var feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe(0);
              expect(feed.url.constructor).toBe(String);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined', function() {
            for(var feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe(0);
              expect(feed.name.constructor).toBe(String);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            var isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when clicked', function() {
              var menuButton = document.querySelector('a.menu-icon-link');
              menuButton.click();
              expect(document.body.classList.contains('menu-hidden')).toBe(false);
              menuButton.click();
              expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        beforeEach(function(done) {
            loadFeed(1, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('have entries', function() {
            var feedContainer = document.querySelector('div.feed');
            var entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(3, function() {
                firstFeed = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function() {
                    secondFeed = document.querySelector('div.feed').innerHTML;
                    done();
                    });
              });
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('changes content when new feed is loaded', function() {
              expect(firstFeed).not.toBe(secondFeed);
         });

    });

}());