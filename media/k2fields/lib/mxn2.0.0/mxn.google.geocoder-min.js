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
mxn.register("google",{Geocoder:{init:function(){this.geocoders[this.api]=new GClientGeocoder()},geocode:function(a){var c=this;if(!a.hasOwnProperty("address")||a.address===null||a.address===""){a.address=[a.street,a.locality,a.region,a.country].join(", ")}if(a.hasOwnProperty("lat")&&a.hasOwnProperty("lon")){var b=a.toProprietary(this.api);this.geocoders[this.api].getLocations(b,function(d){c.geocode_callback(d)})}else{this.geocoders[this.api].getLocations(a.address,function(d){c.geocode_callback(d)})}},geocode_callback:function(c){var a={};if(typeof(c)==="undefined"||!c.hasOwnProperty("Status")||c.Status.code!=200){this.error_callback(c)}else{a.street="";a.locality="";a.region="";a.country="";var b=c.Placemark[0];mxn.util.traverse(b,function(d){return d.AddressDetails},function(d){return d.Country},function(d){a.country=d.CountryName;return d.AdministrativeArea},function(d){a.region=d.AdministrativeAreaName;return d.SubAdministrativeArea||d},function(d){return d.Locality},function(d){a.locality=d.LocalityName;return d.Thoroughfare},function(d){a.street=d.ThoroughfareName;return null});a.point=new mxn.LatLonPoint(b.Point.coordinates[1],b.Point.coordinates[0]);this.callback(a)}}}});