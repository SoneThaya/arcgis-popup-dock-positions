import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const MapDock = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/MapView", "esri/WebMap"]).then(
      ([Map, MapView, WebMap]) => {
        var webmap = new WebMap({
          portalItem: {
            // autocasts as new PortalItem()
            id: "ea59225e90e34924a4e593269de347af",
          },
        });

        var view = new MapView({
          map: webmap,
          popup: {
            dockEnabled: true,
            dockOptions: {
              // Disables the dock button from the popup
              buttonEnabled: false,
              // Ignore the default sizes that trigger responsive docking
              breakpoint: false,
            },
          },
          container: "viewDiv",
        });

        let popup = view.popup;
        popup.visibleElements = {
          closeButton: false,
        };

        view.when(function () {
          var centerPoint = view.center.clone();

          popup.open({
            title: "Popup dock positions",
            location: centerPoint,
            content:
              "Use the control in the center of the map to change the location where the popup will dock.",
          });

          var selectNode = document.getElementById("dockPositionControl");

          // Let user change the position dockOptions.position property of the
          // popup at runtime from the drop-down list.
          selectNode.addEventListener("change", function (event) {
            popup.set("dockOptions", {
              breakpoint: false,
              buttonEnabled: false,
              position: event.target.value,
            });
          });
        });
      }
    );
  }, []);

  return (
    <>
      <div
        id="viewDiv"
        style={{ height: "100vh", width: "100vw" }}
        ref={MapEl}
        className="esri-widget"
      ></div>
      <div class="docking-control">
        <label for="dockPositionControl">Popup Dock Position</label>
        <select id="dockPositionControl">
          <option selected value="auto">
            Auto
          </option>
          <option value="top-left">Top Left</option>
          <option value="top-center">Top Center</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>
    </>
  );
};

export default MapDock;
