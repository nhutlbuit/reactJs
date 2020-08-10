import { combineReducers } from 'redux';
import { heroesReducer, selectedHeroReducer } from './hero.reducer';
import { selectedVillainReducer, villainsReducer } from './villain.reducer';
import { selectedStudentReducer, studentsReducer } from '../components/student/student.reducer';

export * from './hero.actions';
export * from './hero.reducer';
export * from './hero.saga';

export * from './villain.actions';
export * from './villain.reducer';
export * from './villain.saga';

export * from '../components/student/student.actions';
export * from '../components/student/student.reducer';
export * from '../components/student/student.saga';

const store = combineReducers({
  villains: villainsReducer,
  heroes: heroesReducer,
  students: studentsReducer,
  selectedStudent: selectedStudentReducer,
  selectedHero: selectedHeroReducer,
  selectedVillain: selectedVillainReducer
});

export default store;
