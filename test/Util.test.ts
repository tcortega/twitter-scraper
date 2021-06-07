import Util from '../src/utils/Util';

describe('Util.ts', () => {
    it('Should be able to generate a new guestId.', async () => {
      const guestId = await Util.getRandomGuestID();
      expect(guestId.length).not.toBe(0);
    });
  });