document.addEventListener('DOMContentLoaded', async () => {
  try {
    async function fetchCollection(collectionName) {
      const response = await fetch(`content/${collectionName}.json`);
      if (!response.ok) {
        console.error(`Error fetching ${collectionName}: ${response.status}`);
        return [];
      }
      return await response.json();
    }

    // --- Cargar y mostrar el contenido del banner ---
    const bannerData = await fetchCollection('banner');
    if (bannerData && bannerData.length > 0) {
      const banner = bannerData[0].data;
      document.getElementById('hero-title').textContent = banner['bigbar-h1'] || '';
      document.getElementById('hero-subtitle').textContent = banner['bigbar-p'] || '';
      const heroButton = document.getElementById('hero-button');
      if (heroButton) {
        heroButton.href = banner['bigbar-a-href'] || '#';
        heroButton.textContent = banner['bigbar-a-text'] || '';
      }
    }

    // --- Cargar y mostrar los programas ---
    const programasData = await fetchCollection('programas');
    const programasContainer = document.getElementById('programas-container');
    if (programasContainer) {
      programasContainer.innerHTML = ''; // Limpiar el indicador de carga
      programasData.forEach(programa => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-content">
            <img src="${programa.data['card-image']}" alt="${programa.data['card-title']}" class="card-image">
            <h3 class="card-title">${programa.data['card-title']}</h3>
            <p class="card-description">${programa.data['card-description']}</p>
            <a href="${programa.data['card-button-href']}" class="card-button">${programa.data['card-button-text'] || 'Explorar'}</a>
          </div>
        `;
        programasContainer.appendChild(card);
      });
    }

    // --- Cargar y mostrar los últimos videos ---
    const videosData = await fetchCollection('videos');
    const videosContainer = document.getElementById('videos-container');
    if (videosContainer) {
      videosContainer.innerHTML = ''; // Limpiar el indicador de carga
      videosData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
          <a href="${video.data['video-link']}" target="_blank" rel="noopener noreferrer">
            <div class="video-container">
              <img src="${video.data['video-thumbnail']}" alt="${video.data['video-title']}" class="video-thumbnail">
              <div class="play-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#ffffff"/></svg>
              </div>
              <div class="video-title">${video.data['video-title']}</div>
            </div>
          </a>
        `;
        videosContainer.appendChild(videoCard);
      });
    }

    // --- Cargar y mostrar los enlaces de redes sociales del footer ---
    const footerData = await fetchCollection('footer');
    if (footerData && footerData.length > 0) {
      const footer = footerData[0].data;
      const facebookLink = document.getElementById('facebook-link');
      if (facebookLink) facebookLink.href = footer['facebook'] || '#';
      const instagramLink = document.getElementById('instagram-link');
      if (instagramLink) instagramLink.href = footer['instagram'] || '#';
      const youtubeLink = document.getElementById('youtube-link');
      if (youtubeLink) youtubeLink.href = footer['youtube'] || '#';
    }

  } catch (error) {
    console.error("Error al cargar o mostrar el contenido del CMS:", error);
  }
});
