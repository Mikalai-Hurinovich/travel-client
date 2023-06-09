import React, { useRef } from 'react';
import FileService from '../services/file.service';

interface FileUploadProps {
	setFile: Function;
	accept: string;
	children: JSX.Element[] | JSX.Element;
	setPhotosLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, setPhotosLoading, children}): JSX.Element => {
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
	const onChange = async (e: any) => {
		setPhotosLoading(true);
		const formData = new FormData();

		for (let i = 0; i < e.target.files.length; i++) {
			formData.append('files', e.target.files[i]);
		}

		FileService.uploadFiles('/places/upload', formData)
			.then((data) => {
				setFile((files: string[]) => {
					return [...files, ...data]
				})
			})
			.catch(err => console.warn(err))
			.finally(() => setPhotosLoading(false))

	}
	return (
		<div onClick={() => ref.current.click()}>
			<input type="file" accept={accept} style={{display: 'none'}} ref={ref} onChange={onChange} multiple/>
			{children}
		</div>
	);
};

export default FileUpload;
