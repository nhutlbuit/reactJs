import axios from 'axios';
import { parseItem, parseList } from '../../store/action-utils';
import API from '../../store/config';

const captains = console;

export const deleteStudentApi = async hero => {
  const response = await axios.delete(`${API}/heroes/${hero.id}`);
  return parseItem(response, 200);
};

export const updateStudentApi = async hero => {
  captains.log(hero.id);
  const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
  return parseItem(response, 200);
};

export const addStudentApi = async hero => {
  const response = await axios.post(`${API}/heroes`, hero);
  return parseItem(response, 201);
};

export const loadStudentsApi = async filter => {
  const response = await axios.get(`/trainingApi/students/search/likeName?name=${filter.searchName}&page=${filter.number}&size=${filter.size}&projection=InlineStudent`);
  return parseList(response, 200);
};
