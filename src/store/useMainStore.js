import { create } from 'zustand';


const useMainStore = create((set) => ({
    searchValue: '',
    searchKeyword: '',
    searchList: [],
    center: {
        lat: 37.56534539636417, 
        lng: 126.97719821079865
    },
    searchItemView: false,
    searchItemViewText: {
        active: 0,
        place_name: '',
        category_group_name: ''
    },
    saveMapList: [],
    setSearchValue: (value) => set({ searchValue: value }),
    setSearchKeyword: (value) => set({ searchKeyword: value }),
    setSearchList: (value) => set({ searchList: value }),
    setCenter: (value) => set({ center: value }),
    setSearchItemView: (value) => set({ searchItemView: value }),
    setSearchItemViewText: (value) => set({ searchItemViewText: value }),
    setSaveMapList: (value) => set({ saveMapList: value })
}))

export default useMainStore;