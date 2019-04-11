import axios from 'axios';

const TagService = {};

TagService.getAllTags = () => axios.get(`http://localhost:3000/tag/all`).then(res => res.data)

export default TagService;