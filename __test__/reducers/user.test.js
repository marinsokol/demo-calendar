/* eslint-disable */
import user from '../../src/reducers/user';
import { USER } from '../../src/constants/actionTypes';

describe('User reducer', () => {

  it('Has default state', () => {
    expect(
      user(undefined, { type: undefined })
    ).toEqual({});
  });

  it('Handles add user', () => {
    expect(
      user(undefined, {
        type: USER.add,
        payload: {
          email: 'marin.sokol@gmail.com',
          uid: 'y7jyJ1TbvIa7nNxtqlCpjfv3C4o2',
          refreshToken: 'ACXxpGGajHkBmckJJPCTW-lijJvO8Mmq4Q9fCrqfuAvi1elFH6wcuPBu7qUA',
          displayName: 'test',
        },
      })
    ).toEqual({
      email: 'marin.sokol@gmail.com',
      uid: 'y7jyJ1TbvIa7nNxtqlCpjfv3C4o2',
      refreshToken: 'ACXxpGGajHkBmckJJPCTW-lijJvO8Mmq4Q9fCrqfuAvi1elFH6wcuPBu7qUA',
    });
  })

});
