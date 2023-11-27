$(document).ready(function() {
    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Get the value of the search input using jQuery
      var searchQuery = $('#searchInput').val();

    });
  });