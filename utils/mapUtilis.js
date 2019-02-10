export function calculateDistance(pointA, pointB) {

    
    const lat1 = pointA.coordinate.latitude;
    const lon1 = pointA.coordinate.longitude;
  
    const lat2 = pointB.coordinate.latitude;
    const lon2 = pointB.coordinate.longitude;
  
    const R = 6371e3; 
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance; // in meters
  }

  export function calDelta(lat,long,accuracy){
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta =accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    var setRegion = {latitude : lat , longitude : long, latitudeDelta : latDelta, longitudeDelta : longDelta}

     return setRegion
         
     
 }