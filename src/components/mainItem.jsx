import { Link } from 'react-router-dom';
import {CustomInput} from './form';
import { IconShare } from './icons/IconShare';
import { IconStar } from './icons/IconStar';
import useMainStore from '@store/useMainStore';
import { IconClose } from './icons/IconClose';
import { useEffect, useState } from 'react';

export const LeftWrapper = () => {
	return (
		<div className="wrapper_left">
			<SearchForm />
        </div>
	);
};

export const LeftMenus = () => {
	return (
        <div className="left_menus">
            <div className="snb_wrap">
                <ul>
					<li className='snb_list'></li>
                </ul>
            </div>
        </div>
    );
}

export const SearchForm = () => {
	const {searchValue, setSearchValue ,setSearchKeyword, searchList, searchItemView, setSearchItemView, setSearchItemViewText} = useMainStore()
	const handleListOpen = (item, idx) => {
		setSearchItemView(true);
		setSearchItemViewText(
			{
				active: 0,
				place_name: item.place_name,
				category_group_name: item.category_group_name
			}
		)
	}
	return (
		<div className='search_form'>
			<div className="top">
				<CustomInput value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} />
				<button type="button" className='btn_search' onClick={() => {setSearchKeyword(searchValue)}}>검색</button>
			</div>
			<div className="content">
				<ul className='address_wrap'>
					{
						searchList.map((item, idx) => {
							return (
								<li key={idx}>
									<button type='button' onClick={() => handleListOpen(item, idx)}>
										<div className='title_wrap'>
											<Link to={item.place_url} target="_blank"><b>{item.place_name}</b><span>{item.category_group_name}</span></Link>
										</div>
										<div className="address_list">
											<p>도로명 : {item.address_name}</p>
											<p>지번 : {item.road_address_name}</p>
										</div>
									</button>
								</li>
							)

						})
					}
				</ul>
				{
					searchItemView &&
					<SearchItemView />
				}
			</div>
		</div>
	)
}

export const SearchItemView = () => {
	const [active, setActive] = useState(0);
	const {searchItemViewText, setSearchItemView, setSearchItemViewText, saveMapList, setSaveMapList} = useMainStore()
	const handleClickSave = () => {
		setActive(active === 0 ? 1 : 0); 
		setSearchItemViewText(
			{
				active: active,
				place_name: searchItemViewText.place_name,
				category_group_name: searchItemViewText.category_group_name
			}
		);
	}


	const handleClickShare = () => {
        // share to social media
    }
	return (
        <div className='search_item_view'>
            <div className='top'>
				<div className="img_wrap">
					img none
					<button className='btn_close' type='button' onClick={() => {setSearchItemView(false)}}>
						<IconClose />
					</button>
				</div>
				<div className='title_wrap'>
					<p><b>{searchItemViewText.place_name}</b><span>{searchItemViewText.category_group_name}</span></p>
				</div>
            </div>
			<div className="content">
				<ul className='btn_wrap'>
					<li className='btn_list'>
						<button type="button" onClick={handleClickSave}>
							<div className="icon_box">
								<IconStar isActive={searchItemViewText.active} />
							</div>
							<div className="text">저장</div>
						</button>
					</li>
					
					<li className='btn_list'>
						<button type="button" onClick={handleClickShare}>
							<div className="icon_box">
								<IconShare />
							</div>
							<div className="text">공유</div>
						</button>
					</li>
				</ul>
				<div className='blank'/>
			</div>
		</div>
	)
}