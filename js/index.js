"use strict";L.Control.include({defaultMaterialOptions:{fab:!0,miniFab:!0,rippleEffect:!0,toolTips:!1,color:"lime-A200"},_setDefaultOptions:function(){var t={};for(var e in this.defaultMaterialOptions)t[e]=this.defaultMaterialOptions[e];if("undefined"!=typeof this.options.materialOptions)for(var e in this.options.materialOptions)t[e]=this.options.materialOptions[e];return t},_addToolTip:function(t,e,o){var i=t.parentNode,l=L.DomUtil.create("div","mdl-tooltip",i);return l.setAttribute("for",e),l.innerHTML=o,l},_createMaterialButton:function(t,e,o,i,l){var a="mdl-button mdl-js-button mdl-button--icon",r=this._setDefaultOptions(),s=L.DomUtil.create("button",a,i);if(this._materialIcon=L.DomUtil.create("i","material-icons",s),this._materialIcon.innerHTML=e,s.title=o,s.id=t,r.fab&&(L.DomUtil.removeClass(s,"mdl-button--icon"),L.DomUtil.addClass(s,"mdl-button--fab"),r.miniFab&&L.DomUtil.addClass(s,"mdl-button--mini-fab")),r.rippleEffect&&L.DomUtil.addClass(s,"mdl-js-ripple-effect"),r.color){var n;if("boolean"==typeof r.color)n="mdl-button--colored";else switch(r.color){case"colored":n="mdl-button--colored";break;case"primary":n="mdl-button--primary";break;case"accent":n="mdl-button--accent";break;default:n="mdl-color--"+r.color}L.DomUtil.addClass(s,n)}return l&&L.DomUtil.addClass(s,l),r.toolTips&&(this._materialToolTip=this._addToolTip(s,t,o),s.removeAttribute("title")),this._materialButton=s,this._materialButton}}),L.Control.MaterialFullscreen=L.Control.Fullscreen.extend({onAdd:function(t){var e=L.DomUtil.create("div","leaflet-control-fullscreen-mdl leaflet-bar-mdl"),o=this.options,i=this._createMaterialButton("leaflet-fullscreen-mdl","fullscreen",o.title["false"],e);return this._map=t,this._map.on("fullscreenchange",this._toggleTitle,this),this._toggleTitle(),L.DomEvent.on(i,"click",this._click,this),e},_toggleTitle:function(){var t={"false":"fullscreen","true":"fullscreen_exit"};this._materialButton.title=this.options.title[this._map.isFullscreen()],this._materialIcon.innerHTML=t[this._map.isFullscreen()],this._materialToolTip&&(this._materialToolTip.innerHTML=this.options.title[this._map.isFullscreen()],this._materialButton.removeAttribute("title"))}}),L.Control.MaterialZoom=L.Control.Zoom.extend({onAdd:function(t){var e=L.DomUtil.create("div","leaflet-control-zoom-mdl leaflet-bar-mdl"),o=this.options;return o.zoomInText="+"===o.zoomInText?"add":o.zoomInText,o.zoomOutText="-"===o.zoomOutText?"remove":o.zoomInText,this._zoomInButton=this._createMaterialButton("leaflet-zoom-in-mdl",o.zoomInText,o.zoomInTitle,e),this._zoomOutButton=this._createMaterialButton("leaflet-zoom-out-mdl",o.zoomOutText,o.zoomOutTitle,e),this._addZoomFunction(this._zoomInButton,this._zoomIn),this._addZoomFunction(this._zoomOutButton,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),e},_addZoomFunction:function(t,e){return L.DomEvent.on(t,"mousedown dblclick",L.DomEvent.stopPropagation).on(t,"click",L.DomEvent.stop).on(t,"click",e,this).on(t,"click",this._refocusOnMap,this),t},_updateDisabled:function(){var t=this._map;this._zoomInButton.removeAttribute("disabled"),this._zoomOutButton.removeAttribute("disabled"),(this._disabled||t._zoom===t.getMinZoom())&&this._zoomOutButton.setAttribute("disabled",!0),(this._disabled||t._zoom===t.getMaxZoom())&&this._zoomInButton.setAttribute("disabled",!0)}}),L.Control.MaterialLayers=L.Control.Layers.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1},_initLayout:function(){var t="leaflet-control-layers-mdl",e=this._container=L.DomUtil.create("div",t+" leaflet-bar-mdl"),o="leaflet-control-layers-toggle-mdl";MaterialMenu.prototype.Constant_={TRANSITION_DURATION_SECONDS:.3,TRANSITION_DURATION_FRACTION:.8,CLOSE_TIMEOUT:600},e.setAttribute("aria-haspopup",!0),L.Browser.touch?L.DomEvent.on(e,"click",L.DomEvent.stopPropagation):L.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);var i="mdl-menu mdl-js-menu mdl-js-menu",l=this._form=L.DomUtil.create("ul",i);switch(l.setAttribute("for",o),this.options.materialOptions.rippleEffect&&L.DomUtil.addClass(l,"mdl-js-ripple-effect"),this.options.position){case"topleft":L.DomUtil.addClass(l,"mdl-menu--bottom-left");break;case"topright":L.DomUtil.addClass(l,"mdl-menu--bottom-right");break;case"bottomright":L.DomUtil.addClass(l,"mdl-menu--top-right");break;case"bottomleft":L.DomUtil.addClass(l,"mdl-menu--top-left")}this._layersLink=this._createMaterialButton(o,"layers","Layers",e);this._baseLayersList=L.DomUtil.create("div",t+"-base",l),this._separator=L.DomUtil.create("div",t+"-separator",l),this._overlaysList=L.DomUtil.create("div",t+"-overlays",l);var a=L.DomUtil.create("li","mdl-menu__divider",this._separator);a.innerHTML="<hr />",e.appendChild(l)},_addItem:function(t){var e,o,i,l="mdl-menu__item",a=L.DomUtil.create("li",l),r=document.createElement("label"),s=this._map.hasLayer(t.layer);this.options.materialOptions.rippleEffect&&L.DomUtil.addClass(r,"mdl-js-ripple-effect"),t.overlay?(L.DomUtil.addClass(r,"mdl-checkbox mdl-js-checkbox"),o="mdl-layer-checkbox-"+L.stamp(t.layer),r.setAttribute("for",o),i=L.DomUtil.create("input","mdl-checkbox__input"),i.type="checkbox",i.defaultChecked=s,i.id=o,e="mdl-checkbox__label"):(L.DomUtil.addClass(r,"mdl-radio mdl-js-radio"),o="mdl-layer-option-"+L.stamp(t.layer),r.setAttribute("for",o),a.innerHTML=this._createRadioElement("leaflet-base-layers",s),i=a.firstChild,i.id=o,e="mdl-radio__label"),i.layerId=L.stamp(t.layer),L.DomEvent.on(i,"click",this._onInputClick,this);var n=L.DomUtil.create("span",e);n.innerHTML=t.name,r.appendChild(i),r.appendChild(n),a.appendChild(r);var m=t.overlay?this._overlaysList:this._baseLayersList;return m.appendChild(a),a},_createRadioElement:function(t,e){var o='<input type="radio" class="mdl-radio__button" name="'+t+'"'+(e?' checked="checked"':"")+"/>";return o}}),L.Control.MaterialGeocoderControl=L.mapbox.GeocoderControl.extend({onAdd:function(t){var e=L.DomUtil.create("div","leaflet-control-geocoder-mdl leaflet-bar-mdl leaflet-control"),o=L.DomUtil.create("form","geocoder-form",e),i=L.DomUtil.create("div","mdl-textfield mdl-js-textfield mdl-shadow--2dp",o),l=L.DomUtil.create("input","mdl-textfield__input",i),a=L.DomUtil.create("label","mdl-textfield__label",i),r=L.DomUtil.create("i","material-icons",a),s=L.DomUtil.create("button","mdl-button mdl-js-button mdl-button--icon clear-search",i),n=L.DomUtil.create("i","material-icons",s),m=(L.DomUtil.create("div","mdl-progress mdl-js-progress mdl-progress__indeterminate",i),L.DomUtil.create("div","leaflet-control-geocoder-results-mdl mdl-shadow--2dp",e));return r.innerHTML="search",n.innerHTML="close",a.setAttribute("for","mapbox-geocoder-mdl"),l.setAttribute("id","mapbox-geocoder-mdl"),l.type="text",l.setAttribute("placeholder","Search..."),s.type="button",L.DomEvent.addListener(s,"click",this._clearSearch,this),L.DomEvent.addListener(o,"submit",this._geocode,this),L.DomEvent.addListener(l,"keyup",this._autocomplete,this),L.DomEvent.disableClickPropagation(e),this._textField=i,this._map=t,this._results=m,this._input=l,this._form=o,e},_clearSearch:function(){this._input.value=null,L.DomUtil.removeClass(this._textField,"is-dirty"),this._closeResults()},_closeResults:function(){L.DomUtil.removeClass(this._results,"show-results"),this._results.childNodes.length>0&&setTimeout(function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},500,this._results)},_displayResults:function(t){if(L.DomUtil.addClass(this._results,"show-results"),0===t.length){var e=L.DomUtil.create("span","no-results-message",this._results);e.innerHTML="No results found."}else L.mapbox.GeocoderControl.prototype._displayResults.apply(this,[t])}});var materialOptions={fab:!0,miniFab:!0,rippleEffect:!0,toolTips:!1,color:"primary"},materialZoomControl=new L.Control.MaterialZoom({position:"topright"}).addTo(map),materialFullscreen=new L.Control.MaterialFullscreen({position:"topright"}).addTo(map),materialLayerControl=new L.Control.MaterialLayers(layers,null,{position:"bottomright",materialOptions:materialOptions}).addTo(map),materialGeocodeControl=new L.Control.MaterialGeocoderControl("mapbox.places",{position:"topleft",autoComplete:!0}).addTo(map);
