import { Map, MapMarker, MapTypeControl, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";
import useMainStore from "../store/useMainStore";
import { fetchCoordinate, fetchKeyword } from '../api/fetchPlaces'
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
    const [coordinates, setCoordinates] = useState({ x: null, y: null });
    // 2024.10.15 시작 _ data에 담기 완료
    const { data, refetch } = useQuery({
        queryKey: ['coordinateAddress', coordinates],
        queryFn: () => fetchCoordinate(coordinates), 
        enabled: coordinates.x !== null && coordinates.y !== null, 
    });

    // 2024.10.15 시작 _ 키워드 통해 지도 클릭 시 place_name 나오게 변경
    const { keywordData, keywordRefetch } = useQuery({
        queryKey: ['fetchKeyword'],
        queryFn: () => fetchKeyword({ter}),
        enabled: false,
    })
    // region 검색결과 마커 생성
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
            console.log(markers)
            map.setBounds(bounds); // 검색된 결과의 범위로 지도 중심 및 범위 설정
        }
    }, [searchList])
    
    let customOverlay = new window.kakao.maps.CustomOverlay({ 
        clickable: true,
        zIndex: 1,
    });

    // 클릭 시 useQuery로 위치값 전송 후 data 사용
    const handleMapClick = (mapData, event) => {
        const x = event.latLng.getLng(); // 경도
        const y = event.latLng.getLat(); // 위도
        setCoordinates({ x, y });
        console.log(data)
        refetch(); // 데이터를 새로 가져오는 함수
    };

    useEffect(() => {
    }, [coordinates, data]);

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
                onClick={(data, event) => handleMapClick(data, event)}
            >
                <MapTypeControl position={"TOPRIGHT"} />
                <ZoomControl position={"RIGHT"} />
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                    // 커스텀 오버레이가 표시될 위치입니다
                    position={{
                        lat: coordinates.y,
                        lng: coordinates.x,
                    }}
                    >
                    {/* 커스텀 오버레이에 표시할 내용입니다 */}
                    {
                        data &&
                        data.map((item) => {
                            return (
                                <div className="label" style={{color: "#000"}}>
                                    <span className="left"></span>
                                    <span className="center">{item.road_address?.building_name}</span>
                                    <span className="right"></span>
                                </div>
                            )
                        })
                    }
                </CustomOverlayMap>
            </Map>
        </div>
    )
}

export default KakaoMap