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

        // Test that ensures all feeds have defined and non-empty URLs
        it('have URLs defined', function() {
            for(var feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
              expect(feed.url.constructor).toBe(String);
            }
        });

        // Test that ensures all feeds have defined and non-empty names
        it('have names defined', function() {
            for(var feed of allFeeds) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
              expect(feed.name.constructor).toBe(String);
            }
        });
    });

    describe('The menu', function() {
        // Ensures the menu is hidden by default
         it('is hidden by default', function() {
            var isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);
         });

         // Ensures menu changes visibility upon clicking
          it('changes visibility when clicked', function() {
              var menuButton = document.querySelector('a.menu-icon-link');
              menuButton.click();
              expect(document.body.classList.contains('menu-hidden')).toBe(false);
              menuButton.click();
              expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function(){

        beforeEach(function(done) {
            loadFeed(1, done);
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
         it('have entries', function() {
            var feedContainer = document.querySelector('div.feed');
            var entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
         });
    });

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

        // Ensures content changes when a new feed is loaded
        it('changes content when new feed is loaded', function() {
              expect(firstFeed).not.toBe(secondFeed);
        });

    });

}());
