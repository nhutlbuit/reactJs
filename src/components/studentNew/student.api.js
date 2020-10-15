import axios from 'axios';
import { parseItem, parseList } from '../../store/action-utils';

export const deleteStudentApi = async student => {
  const response = await axios.delete(`/trainingApi/students/${student.id}`);
  return parseItem(response, 200);
};

export const updateStudentApi = async student => {
  const response = await axios.put(`/trainingApi/students/${student.id}`, student);
  return parseItem(response, 200);
};

export const addStudentApi = async student => {
  const response = await axios.post(`/trainingApi/students`, student);
  return parseItem(response, 201);
};

export const loadStudentsApi = async filter => {
  const response = await axios.get(`/trainingApi/students/search/likeName?name=${filter.searchName}&page=${filter.pageNo-1}&size=${filter.recordsPerPage}&sort=${filter.sortByCols},${filter.orderBy}&projection=InlineStudent`);
  return parseList(response, 200);
};

export const loadClassesApi = async () => {
  const response = await axios.get(`/trainingApi/trainingClasses/search/fetchClassCodes?projection=InlineTrainingClassGetIdOnly`);
  return parseList(response, 200);
};
