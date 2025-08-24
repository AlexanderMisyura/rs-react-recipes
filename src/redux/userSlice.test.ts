import { countryList } from '@constants';
import type { User } from '@ts-interfaces';

import reducer, { add, selectAllCountries, selectAllUsers } from './userSlice';

const testUser: User = {
  id: '1',
  name: 'Test',
  age: 99,
  email: 'test@test.com',
  password: 'test',
  gender: 'Male',
  areTermsAccepted: true,
  image: '',
  country: 'USA',
};

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      countries: countryList,
    });
  });

  it('should handle adding a user to an empty list', () => {
    const previousState = { users: [], countries: [] };
    expect(reducer(previousState, add(testUser))).toEqual({
      users: [testUser],
      countries: [],
    });
  });

  it('should handle adding a user to an existing list', () => {
    const anotherUser = { ...testUser, id: '2' };
    const previousState = { users: [anotherUser], countries: [] };
    expect(reducer(previousState, add(testUser))).toEqual({
      users: [anotherUser, testUser],
      countries: [],
    });
  });

  it('should select all users from state', () => {
    const state = { users: { users: [testUser], countries: [] } };
    expect(selectAllUsers(state)).toEqual([testUser]);
  });

  it('should select all countries from state', () => {
    const state = { users: { users: [], countries: ['USA', 'Canada'] } };
    expect(selectAllCountries(state)).toEqual(['USA', 'Canada']);
  });
});
