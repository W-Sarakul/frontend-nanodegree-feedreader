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

         it('URL are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


         it('Name are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    describe('The menu', function() {
      let body =  document.querySelector('body');

       it('Menu should be hidden', function() {
         // the menu-hidden class should be applied on body
         expect(body.classList.contains('menu-hidden')).toBe(true);
       });


        it('Menu should show or hide when clicking', function() {
          // get menu icon
          let menuIcon = $('.menu-icon-link');
          // when the menu button is clicked 1st time
          menuIcon.trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(false);
          // when the menu icon is clicked 2nd time
          menuIcon.trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });


    });



    describe('Initial Entries', function() {

       beforeEach(function(done) {
         loadFeed(0, done);
       });


       it('.feed should have at least 1 .entry element', function() {
         expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
       });
    });


    describe('New Feed Selection', function() {

       const feed = document.querySelector('.feed');
       let firstFeed = ''; // first feed of the first round of loadFeed function
       let secondFeed = ''; // first feed of the second round of loadFeed function

       beforeEach(function(done) {
         loadFeed(0, function() {
           firstFeed = feed.children[0].innerText;
           loadFeed(1, function() {
             secondFeed = feed.children[0].innerText;
             done();
           });
         });
       });

       it('The content of each feed should be different', function() {
         // The content of the first feed of ach round should differ from each other.
         expect(firstFeed.localeCompare(secondFeed)).not.toBe(0);
       })

    });


}());
