$(document).ready(function() {
    $('#searchForm').submit(function(event) {
    // Prevent the form from submitting
      event.preventDefault();

      // Get the value of the search input
      var searchQuery = $('#searchInput').val();

    });
  });

  module.exports = searchQuery