import { Map, MapMarker, MapTypeControl, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";
import useMainStore from "../store/useMainStore";
import { useEffect, useState } from "react";

const KakaoMap = () => {
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [level, setLevel] = useState(3)
    const [map, setMap] = useState()
    const {searchKeyword, searchList,  setSearchList, center, setCenter} = useMainStore()

    useEffect(() => {
        if (!map || !searchKeyword) return; // searchKeyword에 대한 확인 추가
        // kakao 객체가 정의되어 있는지 확인
        if (typeof kakao === "undefined") {
          console.error("kakao 객체가 정의되지 않았습니다.");
          return;
        }
      /* eslint-disable */
        const ps = new kakao.maps.services.Places();
      
        ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            let markers = [];
      
            for (let i = 0; i < data.length; i++) {
              markers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x,
                },
                content: data[i].place_name,
              });
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            setCenter({
                lat: Number(data[0].y),
                lng: Number(data[0].x)
            })
            setMarkers(markers);
            setSearchList(data);
            setLevel(3)
            map.setBounds(bounds);
          } else {
            console.error("검색 실패:", status); // 검색 실패 시 오류 로그
          }
        });
      }, [map, searchKeyword]);
    return (
        <div className="kakao_map_wrapper">
            <Map // 로드뷰를 표시할 Container
                center={{
                    lat: center.lat,
                    lng: center.lng,
                }}
                level={level}
                onCreate={setMap}
                className="kakao_map"
            >
            {markers.map((marker) => (
                <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => setInfo(marker)}
                >
                {info &&info.content === marker.content && (
                    <div style={{color:"#000"}}>{marker.content}</div>
                )}
                </MapMarker>
            ))}
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
            </Map>
        </div>
    )
}

export default KakaoMap


export const CustomOverlayMapItem = () => {
    return (
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={{
            lat: 33.450701,
            lng: 126.570667,
            }}
        >
            {/* 커스텀 오버레이에 표시할 내용입니다 */}
            <div className="label" style={{color: "#000"}}>
                <span className="left"></span>
                <span className="center">카카오!</span>
                <span className="right"></span>
            </div>
      </CustomOverlayMap>
    )
}