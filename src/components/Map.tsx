import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { ReactElement, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import {
  FaBaby,
  FaCampground,
  FaChargingStation,
  FaCoffee,
  FaGasPump,
  FaHandsHelping,
  FaHotTub,
  FaHotel,
  FaInfo,
  FaMoneyBillWave,
  FaMountain,
  FaShoppingBag,
  FaShower,
  FaTree,
  FaUtensils,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import { MdOutlineMuseum } from "react-icons/md";

interface MapProps {
  zoom: [number];
  center: [number, number];
}

const Map: React.FC<MapProps> = ({ zoom, center }) => {
  const renderIconToString = (icon: ReactElement) => {
    return renderToString(icon);
  };

  const mapContainer = useRef<HTMLDivElement | null>(null);

  const loadGeoJSON = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  useEffect(() => {
    if (mapContainer.current) {
      const map = new maplibre.Map({
        container: mapContainer.current,
        zoom: zoom[0],
        center: center,
        style: {
          version: 8,
          glyphs: "https://glyphs.geolonia.com/{fontstack}/{range}.pbf",
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              maxzoom: 19,
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm-layer", type: "raster", source: "osm" }],
        },
      });

      // 現在地を取得する
      const geolocate = new maplibre.GeolocateControl({
        trackUserLocation: true,
      });
      map.addControl(geolocate, "bottom-right");

      map.on("load", async () => {
        const stationData = await loadGeoJSON("roadside_station.geojson");

        // 道の駅の情報ソースを取得する
        map.addSource("station-points", {
          type: "geojson",
          data: stationData,
        });

        // 道の駅のピンを表示する
        map.addLayer({
          id: "station-points",
          type: "circle",
          source: "station-points",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              0.1,
              5,
              3,
              10,
              10,
              15,
              15,
              20,
              30,
            ],
            "circle-color": [
              "case",
              ["==", ["get", "P35_016"], 1],
              "#ff0000",
              [
                "any",
                ["==", ["get", "P35_013"], 1],
                ["==", ["get", "P35_014"], 1],
              ],
              "#ff7f00",
              "#007cbf",
            ],
          },
        });

        // 道の駅の名称を表示する
        map.addLayer({
          id: "station-points-text",
          type: "symbol",
          source: "station-points",
          minzoom: 8,
          layout: {
            "text-field": ["get", "P35_006"],
            "text-font": ["Noto Sans CJK JP Regular"],
            "text-offset": [0, 0.8],
            "text-anchor": "top",
            "text-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10, // zoom is 10 (or less)
              10, // font-size is 8px
              14, // zoom is 14 (or greater)
              14, // font-size is 14px
            ],
          },
          paint: {
            "text-halo-width": 2,
            "text-halo-color": "#fff",
          },
        });

        // ピンをクリックしたときのポップアップ表示
        const popup = new maplibre.Popup({
          closeButton: false,
          closeOnClick: true,
        });

        map.on("click", "station-points", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const stationName = feature.properties?.P35_006;
            popup
              .setLngLat(feature.geometry.coordinates)
              .setHTML(
                `\
                <div style="font-weight:900; font-size: 1rem;"><a href=${
                  feature.properties?.P35_007
                }>${feature.properties?.P35_006}</a></div>\
                <div>${feature.properties?.P35_003} ${
                  feature.properties?.P35_004
                }</div>\
                <div style="display: flex;>\
                <span ${
                  feature.properties?.P35_011 === 1.0 ? "" : ' color:#ccc"'
                }>${renderIconToString(<FaMoneyBillWave />)}</span>\
                <span${
                  feature.properties?.P35_012 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }> ${renderIconToString(<FaBaby />)}</span>\
                <span${
                  feature.properties?.P35_013 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }> ${renderIconToString(<FaUtensils />)}</span>\ 
                <span${
                  feature.properties?.P35_014 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaCoffee />)}</span>\   
                <span${
                  feature.properties?.P35_015 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(
                  <FaHotel />
                )}</span>\                                  
                <span${
                  feature.properties?.P35_016 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaHotTub />)}</span>\ 
                <span${
                  feature.properties?.P35_017 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaCampground />)}</span>\ 
                <span${
                  feature.properties?.P35_018 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaTree />)}</span>\ 
                <span${
                  feature.properties?.P35_019 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaMountain />)}</span>\ 
                <span${
                  feature.properties?.P35_020 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<MdOutlineMuseum />)}</span>\ 
                <span${
                  feature.properties?.P35_021 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaGasPump />)}</span>\ 
                <span${
                  feature.properties?.P35_022 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaChargingStation />)}</span>\ 
                <span${
                  feature.properties?.P35_023 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaWifi />)}</span>\ 
                <span${
                  feature.properties?.P35_024 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaShower />)}</span>\ 
                <span${
                  feature.properties?.P35_025 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaHandsHelping />)}</span>\ 
                <span${
                  feature.properties?.P35_026 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaInfo />)}</span>\ 
                <span${
                  feature.properties?.P35_027 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(
                  <FaWheelchair />
                )}</span>\                 
                <span${
                  feature.properties?.P35_028 === 1.0
                    ? ""
                    : ' style="color:#ccc"'
                }>  ${renderIconToString(<FaShoppingBag />)}</span>\   
                </div>\
                `
              )
              .addTo(map);
          }
        });
      });

      // ピンにマウスオーバーしたときにカーソルをポインターにする
      map.on("mouseenter", "station-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "station-points", () => {
        map.getCanvas().style.cursor = "";
      });

      return () => {
        map.remove();
      };
    }
  }, [zoom, center]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
