import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface IFeatures {
	selectedFeatures: string[],
	onChange?: Dispatch<SetStateAction<string[]>>,
	readonly?: boolean
}

const Features: React.FC<IFeatures> = ({selectedFeatures, onChange, readonly = false}): JSX.Element => {
	function handleClick (e: ChangeEvent<HTMLInputElement>) {
		const {id, checked} = e.target;
		if (!readonly && onChange) {
			checked ?
				onChange([...selectedFeatures, id])
				:
				onChange(selectedFeatures?.filter((selectedId: string) => selectedId !== id))
		}
	}

	function isFeatureSelected (feature: string) {
		return selectedFeatures?.includes(feature);
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-2">
			{(readonly && isFeatureSelected('kitchen') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="kitchen">Kitchen</label>
						{!readonly &&
                <input checked={isFeatureSelected('kitchen')} className="mr-1" type="checkbox" id="kitchen"
                       onChange={(e) => handleClick(e)}/>}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"/>
              </svg>
              <span>Kitchen</span>
          </div>}
			{(readonly && isFeatureSelected('wifi') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="wifi">wifi</label>
						{!readonly && <input checked={isFeatureSelected('wifi')} className="mr-1" type="checkbox" id="wifi"
                                 onChange={(e) => handleClick(e)}/>}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>
              </svg>
              <span>Wifi</span>
          </div>}
			{(readonly && isFeatureSelected('tv') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="tv">tv</label>
						{!readonly && <input checked={isFeatureSelected('tv')} className="mr-1" type="checkbox" id="tv"
                                 onChange={(e) => handleClick(e)}/>}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"/>
              </svg>
              <span>TV</span>
          </div>}
			{(readonly && isFeatureSelected('workspace') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="workspace">workspace</label>
						{!readonly &&
                <input checked={isFeatureSelected('workspace')} className="mr-1" type="checkbox" id="workspace"
                       onChange={(e) => handleClick(e)}/>}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/>
              </svg>
              <span>Workspace</span>
          </div>}
			{(readonly && isFeatureSelected('shopping') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="shopping">shopping</label>
						{!readonly &&
                <input checked={isFeatureSelected('shopping')} className="mr-1" type="checkbox" id="shopping"
                       onChange={(e) => handleClick(e)}/>}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
              <span>Shopping</span>
          </div>}
			{(readonly && isFeatureSelected('ac') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="ac">ac</label>
						{!readonly && <input checked={isFeatureSelected('ac')} className="mr-1" type="checkbox" id="ac"
                                 onChange={(e) => handleClick(e)}/>}
              <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1.2em"
                  width="1.2em"
              >
                  <path
                      d="M8 16a.5.5 0 01-.5-.5v-1.293l-.646.647a.5.5 0 01-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 11-.966-.26l.237-.882-1.12.646a.5.5 0 01-.5-.866l1.12-.646-.884-.237a.5.5 0 11.26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 01-.258-.966l.883-.237-1.12-.646a.5.5 0 11.5-.866l1.12.646-.237-.883a.5.5 0 11.966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 11.707-.708l.646.647V.5a.5.5 0 111 0v1.293l.647-.647a.5.5 0 11.707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 11.966.26l-.236.882 1.12-.646a.5.5 0 01.5.866l-1.12.646.883.237a.5.5 0 11-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 01.259.966l-.883.237 1.12.646a.5.5 0 01-.5.866l-1.12-.646.236.883a.5.5 0 11-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 01-.707.708l-.647-.647V15.5a.5.5 0 01-.5.5z"/>
              </svg>
              <span>AC</span>
          </div>}
			{(readonly && isFeatureSelected('dryer') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="dryer">dryer</label>
						{!readonly &&
                <input checked={isFeatureSelected('dryer')} className="mr-1" type="checkbox" id="dryer"
                       onChange={(e) => handleClick(e)}/>}
              <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1.2em"
                  width="1.2em"
              >
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M6 3 H18 A3 3 0 0 1 21 6 V18 A3 3 0 0 1 18 21 H6 A3 3 0 0 1 3 18 V6 A3 3 0 0 1 6 3 z"/>
                  <path d="M3 11l8-8M3 17L17 3"/>
              </svg>
              <span>Dryer</span>
          </div>}
			{(readonly && isFeatureSelected('washer') || !readonly) &&
          <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 gap-2 bg-white">
              <label className="sr-only" htmlFor="washer">washer</label>
						{!readonly &&
                <input checked={isFeatureSelected('washer')} className="mr-1" type="checkbox" id="washer"
                       onChange={(e) => handleClick(e)}/>}
              <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1.2em"
                  width="1.2em"
              >
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M6 3 H18 A3 3 0 0 1 21 6 V18 A3 3 0 0 1 18 21 H6 A3 3 0 0 1 3 18 V6 A3 3 0 0 1 6 3 z"/>
                  <path d="M4 4.01C9.333 9.333 14.667 9.33 20 4"/>
              </svg>
              <span>Washer</span>
          </div>}
		</div>
	);
};

export default Features;
