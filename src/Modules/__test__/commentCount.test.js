import commentCounter from '../commentCount.js';

describe('Test the comment counter method', () => {
  it('count the array length: 3', () => {
    expect(
      commentCounter([
        {
          item_id: 12,
          username: 'Ezra',
          comment: 'I love the food',
        },
        {
          item_id: 34,
          username: 'Franck',
          comment: 'I love the food',
        },
        {
          item_id: 56,
          username: 'EKut',
          comment: 'I love the food',
        },
      ]),
    ).toEqual(3);
  });
  it('count the array length: 2', () => {
    expect(
      commentCounter([
        {
          item_id: 67,
          username: 'Ezra',
          comment: 'I love the food',
        },
        {
          item_id: 89,
          username: 'Franck',
          comment: 'I love the food',
        },
      ]),
    ).toEqual(2);
  });
  it('count the array length: 0', () => {
    expect(
      commentCounter([]),
    ).toEqual(0);
  });
});