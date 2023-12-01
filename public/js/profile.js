const newFormHandler = async (event) => {
    event.preventDefault();
  
    const trip = document.querySelector('#itinerary-name').value.trim();
    const location = document.querySelector('#itinerary-location').value.trim();
    const review = document.querySelector('#itinerary-review').value.trim();
    const landmarkName = document.querySelector('#itinerary-landmark-name').value.trim();
    const landmarkType = document.querySelector('#itinerary-landmark-type').value.trim();
    const postDate = document.querySelector('#post-date').value.trim();
    
    if (trip && location && review && landmarkName && landmarkType && postDate) {
      const response = await fetch(`/api/itineraries`, {
        method: 'POST',
        body: JSON.stringify({ trip, location, review, landmarkName, landmarkType, postDate }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create itinerary');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/itineraries/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete itinerary');
      }
    }
  };
  
  document
    .querySelector('.new-itinerary-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.itinerary-list')
    .addEventListener('click', delButtonHandler);
  