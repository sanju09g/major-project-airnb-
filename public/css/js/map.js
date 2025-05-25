//public folder js file has no access to process.env variables only access to ejs so ejs store it in js variables then we can access here


  mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
    
    
// we cant access coordinates here so write it in script then use like before 
    const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`)
  )
    .addTo(map);