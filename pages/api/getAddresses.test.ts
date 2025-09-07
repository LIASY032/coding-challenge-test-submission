import handler from './getAddresses';

function createMocks(query: any = {}) {
  const req: any = { query };
  const json = jest.fn();
  const status = jest.fn(() => ({ json, send } as any));
  const send = jest.fn();
  const res: any = { status, json, send };
  return { req, res, status, json, send };
}

describe('/api/getAddresses', () => {
  it('400 when fields missing', async () => {
    const { req, res, status, send } = createMocks({});
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ errormessage: expect.any(String) }));
  });

  it('400 when postcode too short', async () => {
    const { req, res, status, send } = createMocks({ postcode: '12', streetnumber: '1' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ errormessage: 'Postcode must be at least 4 digits!' }));
  });

  it('200 with details when valid', async () => {
    const { req, res, status, json } = createMocks({ postcode: '1234', streetnumber: '33' });
    await handler(req, res);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ status: 'ok', details: expect.any(Array) }));
  });
});


