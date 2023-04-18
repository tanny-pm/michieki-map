import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useRef } from "react";

interface MapProps {
  zoom: [number];
  center: [number, number];
}

const Map: React.FC<MapProps> = ({ zoom, center }) => {
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

        // TODO: 道の駅の名称を表示する（日本語フォント対応する）
        map.addLayer({
          id: "station-points-text",
          type: "symbol",
          source: "station-points",
          layout: {
            "text-field": ["get", "P35_006"],
            "text-variable-anchor": ["top", "bottom", "left", "right"],
            "text-radial-offset": 0.5,
            "text-justify": "auto",
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
              .setHTML(stationName)
              .addTo(map);
          }
        });
      });

      return () => {
        map.remove();
      };
    }
  }, [zoom, center]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
