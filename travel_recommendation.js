
  function createDestinationCard(name, imageUrl, description, timeZone) {
    const card = document.createElement("div");
    card.className = "bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl transition-transform hover:scale-105";
  
    const options = { timeZone, hour12: true, hour: "numeric", minute: "numeric", second: "numeric" };
    const localTime = new Date().toLocaleTimeString("en-US", options);
  
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="rounded-xl mb-3 w-full h-48 object-cover">
      <h3 class="text-lg font-semibold">${name}</h3>
      <p class="text-white/80 text-sm mt-1">${description}</p>
      <p class="text-sm mt-2 text-teal-300 font-semibold">🕒 Local time: ${localTime}</p>
      <button class="mt-3 bg-teal-600 hover:bg-teal-500 text-white text-sm px-4 py-2 rounded-lg">Visit</button>
    `;
  
    return card;
  }
  
  
  async function searchDestination() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p class='text-center text-white'>Loading...</p>";
  
    try {
      // Fetch data from JSON file
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
  
      resultsContainer.innerHTML = "";
      let results = [];
  
      // Search countries & cities
      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
          results = results.concat(country.cities);
        } else {
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(input)) {
              results.push(city);
            }
          });
        }
      });
  
      // Search temples
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input) || input.includes("temple")) {
          results.push(temple);
        }
      });
  
      // Search beaches
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(input) || input.includes("beach")) {
          results.push(beach);
        }
      });
  
      // No results
      if (results.length === 0) {
        resultsContainer.innerHTML = `<p class="text-center text-red-400 font-semibold">No results found.</p>`;
        return;
      }
  
      // Show results
      results.forEach(dest => {
        const card = createDestinationCard(dest.name, dest.imageUrl, dest.description, dest.timeZone);
        resultsContainer.appendChild(card);
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
      resultsContainer.innerHTML = `<p class="text-center text-red-400 font-semibold">Error loading data. Please try again.</p>`;
    }
  }
  
  
  function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("resultsContainer").innerHTML = "";
  }
  