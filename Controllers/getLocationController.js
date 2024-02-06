export function getLocation() {
  const coordsRef = document.getElementById("coords");
  const getLocation = document.getElementById("getLocation");

  // Ask the user for permission to access their current position
  getLocation.onclick = () => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    function success({ coords }) {
      console.log("Location obtained", coords);
      getApiData(coords);
      getLocation.classList.add("hidden");
    }

    function error({ message }) {
      coordsRef.innerHTML = `Location not available, reason: ${message}`;
    }
  };
}

//To go back to the beginning, add classList.remove("hidden")
