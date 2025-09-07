import reducer, { addAddress, removeAddress, updateAddresses } from './addressBookSlice';

const makeAddress = (id: string) => ({
  id,
  firstName: 'A',
  lastName: 'B',
  street: 'S',
  houseNumber: '1',
  postcode: '1234',
  city: 'C',
});

describe('addressBookSlice', () => {
  it('prevents duplicate addresses on add', () => {
    const a1 = makeAddress('1');
    const state = reducer({ addresses: [] }, addAddress(a1));
    const state2 = reducer(state, addAddress(a1));
    expect(state2.addresses).toHaveLength(1);
  });

  it('removes address by id', () => {
    const a1 = makeAddress('1');
    const a2 = makeAddress('2');
    const s1 = reducer({ addresses: [] }, updateAddresses([a1, a2]));
    const s2 = reducer(s1, removeAddress('1'));
    expect(s2.addresses).toHaveLength(1);
    expect(s2.addresses[0].id).toBe('2');
  });
});


