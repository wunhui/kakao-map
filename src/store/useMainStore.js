import { create } from 'zustand';


const useMainStore = create((set) => ({
    map: '',
    markers: [],
    level: 3,
    searchValue: '',
    searchKeyword: '',
    searchList: [],
    center: {
        lat: 37.56534539636417, 
        lng: 126.97719821079865
    },
    setMap: (value) => set({ map: value }),
    setMarkers: (value) => set({ markers: value }),
    setLevel: (value) => set({ level: value}),
    setSearchValue: (value) => set({ searchValue: value }),
    setSearchKeyword: (value) => set({ searchKeyword: value }),
    setSearchList: (value) => set({ searchList: value }),
    setCenter: (value) => set({ center: value }),
}))

export default useMainStore;