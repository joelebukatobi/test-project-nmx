document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const customerList = document.querySelector('.customer-list');
  const selectDropdown = document.querySelector('.select');
  const selectHeader = document.querySelector('.select-header');
  const selectOptions = document.querySelector('.select-options');

  // Toggle display of selectOptions when selectHeader is clicked
  selectHeader.addEventListener('click', function () {
    selectOptions.style.display = selectOptions.style.display === 'block' ? 'none' : 'block';
  });

  // Close selectOptions when a click event occurs outside of selectDropdown
  document.addEventListener('click', function (event) {
    if (!selectDropdown.contains(event.target)) {
      selectOptions.style.display = 'none';
    }
  });

  // Handle selection of an option within the selectOptions
  selectOptions.addEventListener('click', function (event) {
    if (event.target.classList.contains('select-option')) {
      // Update the selectHeader with the selected option
      selectHeader.textContent = event.target.textContent;
      // Close the selectOptions dropdown
      selectOptions.style.display = 'none';
      // Fetch and display customers based on the selected option and search keyword
      fetchAndDisplayCustomers(event.target.textContent, searchInput.value);
    }
  });

  // Object of image links corresponding to each customer's id
  const customerAvatar = {
    1: 'https://images.unsplash.com/photo-1597071058713-6776461d7737',
    2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    3: 'https://images.unsplash.com/photo-1557053908-4793c484d06f',
    4: 'https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9',
    5: 'https://images.unsplash.com/photo-1554727242-741c14fa561c',
    6: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    7: 'https://plus.unsplash.com/premium_photo-1675129779554-dc86569708c8',
    8: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d',
    9: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda',
    10: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942',
  };

  // Function to fetch and display customers based on sortOrder and searchKeyword
  function fetchAndDisplayCustomers(sortOrder, searchKeyword) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        // Filter customers based on the searchKeyword if provided
        if (searchKeyword) {
          data = data.filter((customer) => {
            return (
              customer.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              customer.email.toLowerCase().includes(searchKeyword.toLowerCase())
            );
          });
        }

        // Sort the data based on the selected sortOrder
        if (sortOrder === 'Name (A-Z)') {
          data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'Name (Z-A)') {
          data.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Clear the customerList
        customerList.innerHTML = '';

        data.forEach((customer) => {
          const article = document.createElement('article');
          article.innerHTML = `
          
            <section>  
            <div class="picture">
            <img src="${customerAvatar[customer.id]}" alt="${customer.name}'s Picture">
            </div>
            <header>
                <h4>${customer.name}</h4>
                <p>@${customer.username}</p>
                <p>“${customer.company.catchPhrase}”</p>
            </header>
            </section>
            <ul>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#email-icon"></use>
              </svg>
              <p>${customer.email}</p>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#location-icon"></use>
              </svg>
              <p> 
                ${customer.address.street}, 
                ${customer.address.suite}, 
                ${customer.address.city}, 
                ${customer.address.zipcode}, 
                ${customer.address.geo.lat}, 
                ${customer.address.geo.lng}
              </p>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#phone-icon"></use>
              </svg>
              <p>${customer.phone}</p>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#web-icon"></use>
              </svg>
              <p>${customer.website}</p>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#briefcase-icon"></use>
              </svg>
              <p>${customer.company.name}</p>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#company-icon"></use>
              </svg>
              <p>${customer.company.bs}</p>
            </li>
          </ul>
          `;
          customerList.appendChild(article);
        });
      })
      .catch((error) => console.error('Error:', error));
  }

  // Event listeners for search and input fields
  searchButton.addEventListener('click', function () {
    const searchKeyword = searchInput.value.trim();
    fetchAndDisplayCustomers(selectHeader.textContent, searchKeyword);
  });

  searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      const searchKeyword = searchInput.value.trim();
      fetchAndDisplayCustomers(selectHeader.textContent, searchKeyword);
    }
  });

  // Initial display of customers using default sortOrder
  fetchAndDisplayCustomers(selectHeader.textContent);
});
