// Javascript program for the haversine formula

function haversine(lat1, lon1, lat2, lon2) {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radiansa
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let rad = 6371;
  let c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}
// Driver Code
let lat1 = 51.5007;
let lon1 = 0.1246;
let lat2 = 40.6892;
let lon2 = 74.0445;
// document.write(haversine(lat1, lon1, lat2, lon2) + " K.M.");

// This code is contributed by avanitrachhadiya2155
export default haversine;
