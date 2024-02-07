export function getLocation() {
  // Ask the user for permission to access their current position
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve(coords);
      },
      ({ coords }) => {
        reject(coords);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

//To go back to the beginning, add classList.remove("hidden")
