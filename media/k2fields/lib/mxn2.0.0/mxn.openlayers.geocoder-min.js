/*
MAPSTRACTION   v2.0.0   http://www.mapstraction.com

The BSD 3-Clause License (http://www.opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2012 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
mxn.register("openlayers",{Geocoder:{init:function(){var a=this},geocode:function(a){var c=this;if(!a.hasOwnProperty("address")||a.address===null||a.address===""){a.address=[a.street,a.locality,a.region,a.country].join(", ")}if(a.hasOwnProperty("lat")&&a.hasOwnProperty("lon")){var b=a.toProprietary(this.api);OpenLayers.Request.GET({url:"http://nominatim.openstreetmap.org/reverse",params:{lat:a.lat,lon:a.lon,addressdetails:1,format:"json"},callback:function(d){c.geocode_callback(JSON.parse(d.responseText),d.status)}})}else{OpenLayers.Request.GET({url:"http://nominatim.openstreetmap.org/search",params:{q:a.address,addressdetails:1,format:"json"},callback:function(d){c.geocode_callback(JSON.parse(d.responseText),d.status)}})}},geocode_callback:function(e,c){var a={};if(c!=200){this.error_callback(response.statusText)}else{if(e instanceof Array&&!e.length){this.error_callback("OpenLayers didn't recognize this address.")}else{a.street="";a.locality="";a.postcode="";a.region="";a.country="";var b;if(e.length>0){b=e[0]}else{b=e}var d=[];if(b.address.country){a.country=b.address.country}if(b.address.state){a.region=b.address.state}if(b.address.city){a.locality=b.address.city}if(b.address.postcode){a.postcode=b.address.postcode}if(b.address.road){d.push(b.address.road)}if(b.address.house_number){d.unshift(b.address.house_number)}if(a.street===""&&d.length>0){a.street=d.join(" ")}a.point=new mxn.LatLonPoint(parseFloat(b.lat),parseFloat(b.lon));this.callback(a)}}}}});