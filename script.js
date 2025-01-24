// key: PFBSKHCPBB9L3B62FZBHZN46T

function fetchData(location) {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=PFBSKHCPBB9L3B62FZBHZN46T`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const processedData = {
        address: data.resolvedAddress,
        temp: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        icon: data.currentConditions.icon,
        forecast: data.days.map((day) => ({
          date: day.datetime,
          temp: day.temp,
          feelslike: day.feelslike,
          humidity: day.humidity,
          icon: day.icon,
        })),
      };
      console.log(processedData);
      return processedData;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchData("random");
