maps = [];

$(document).ready(function(){
  
  /* NAVIGATION EXPAND
   *
   *
   */
  $('#nav-expand').on('click', function(){
    $('#nav').slideToggle(300);
    $(this).toggleClass('open');
    if($(this).hasClass('open')) {
      $(this).html('<i class="fa fa-times"></i>');
    } else {
      $(this).html('<i class="fa fa-bars"></i>');
    }
  });

  /* MAPS
   * This builds a map if the element is specified with class .map-marker
   * It only requires latitude and longitude, which can be passed as attributes
   * in the .map-marker element like data-latitude & data-longitude.
   * If a .map-marker element exists, run buildData() on each of the instances.
   *
   */
  var mapElems = document.getElementsByClassName('map-marker');
  if (mapElems.length > 0) {
    for ( var m = 0; m < mapElems.length; m++ ) buildMapMarker(mapElems[m]);
  }

  /* PERSON HOVER
   * This builds a tooltip when the user hovers on a person in /people
   *
   */
  var tooltip = null;
  $('.person').on('mouseover', function(){
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = $(this).attr('data-title');
    $(this).append(tooltip);
  });
  $('.person').on('mouseout', function(){
    $('.tooltip').remove();
  });

});

function buildMapMarker(elem) {
  var coordinates = [elem.getAttribute('data-longitude'), elem.getAttribute('data-latitude')];
  var map = L.mapbox.map(elem.id).setView(coordinates, 10);
  if (!elem.getAttribute('data-scrollZoom')) map.scrollWheelZoom.disable();
  var marker = L.marker(coordinates).addTo(map);
  if (elem.getAttribute('data-popup')) marker.bindPopup(elem.getAttribute('data-popup'));
  maps.push(map);
}