const newFormHandler = async (event) => {
    event.preventDefault();
  
    const trip = document.querySelector('#itinerary-name').value.trim();
    const location = document.querySelector('#itinerary-location').value.trim();
    const review = document.querySelector('#itinerary-review').value.trim();
    const name = document.querySelector('#itinerary-landmark-name').value.trim();
    const type = document.querySelector('#itinerary-landmark-type').value.trim();
    const date = document.querySelector('#post-date').value.trim();
    
    if (trip && location && review && name && type && date) {
      const response = await fetch(`/api/itineraries`, {
        method: 'POST',
        body: JSON.stringify({ trip, location, review, name, type, date }),
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
  
  const list = document.querySelector('.itinerary-list')
  if (list) {
    list.addEventListener('click', delButtonHandler);
  }
  