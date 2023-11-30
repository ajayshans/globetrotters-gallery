const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#itinerary-name').value.trim();
    const needed_funding = document.querySelector('#itinerary-funding').value.trim();
    const description = document.querySelector('#itinerary-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/itineraries`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
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
  