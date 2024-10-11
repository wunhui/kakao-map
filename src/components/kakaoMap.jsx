import { Map, MapMarker, MapTypeControl, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";
import useMainStore from "../store/useMainStore";
import { useEffect, useState } from "react";

const KakaoMap = () => {
    /* eslint-disable */
    const {
      searchList,
      map,
      setMap,
      markers,
      setMarkers,
      center,
      setCenter,
      level,
      setLevel
    } = useMainStore()
    useEffect(() => {
        if (searchList && searchList.length > 0) {
            console.log(searchList)
            const bounds = new kakao.maps.LatLngBounds();
            const markers = [];
            // 검색 결과의 각 장소에 대해 마커 생성
            searchList.forEach((item) => {
                const boundPosition = new kakao.maps.LatLng(searchList[0].y, searchList[0].x); // 장소 좌표 (위도, 경도)
                const markerPosition = new kakao.maps.LatLng(item.y, item.x); // 장소 좌표 (위도, 경도)
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
                setCenter({
                    lat: searchList[0].y,
                    lng: searchList[0].x,
                })
                setLevel(2);
                marker.setMap(map); // 마커를 지도에 표시
                markers.push(marker); // 마커 배열에 추가
                bounds.extend(boundPosition); // 각 마커 좌표로 경계 확장
            });
            setMarkers(markers); // Zustand 상태에 마커 배열 저장
            map.setBounds(bounds); // 검색된 결과의 범위로 지도 중심 및 범위 설정
        }
    }, [searchList])
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
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
            </Map>
        </div>
    )
}

export default KakaoMap