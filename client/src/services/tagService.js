import axios from 'axios';
import { createSelector } from 'reselect';

const API_URL = 'https://6854c9506a6ef0ed66300b4d.mockapi.io/api/tags';

export const createTagApi = (tag) => axios.post(API_URL, tag);
export const fetchTags = () => axios.get(API_URL);
export const createTag = (tag) => axios.post(API_URL, tag);
export const updateTag = (id, updatedFields) =>
    axios.put(`${API_URL}/${id}`, updatedFields);
export const deleteTag = (id) => axios.delete(`${API_URL}/${id}`);
export const selectAllTags = (state) => state.tags.items || [];

export const selectTagsByIds = (ids) =>
  createSelector([selectAllTags], (tags) =>
    tags.filter((tag) => ids.includes(tag.id))
  );