const generateUniqueId = require('../../src/utils/generateUniquId')

describe('Generate Unique Id', () => {
    it('should generate an Unique Id', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});