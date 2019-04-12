import dbConnect from './dbConnect';

import axios from 'axios';

const TagService = {};

TagService.getAllTags = () => axios.get(`${dbConnect}/tag/all`).then(res => res.data)

export default TagService;