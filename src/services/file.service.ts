import axios from 'axios';

async function uploadFiles (url: string, formData: FormData) {
	const res = await axios.post(url, formData)
	return res.data;
}

const FileService = {uploadFiles}
export default FileService;
