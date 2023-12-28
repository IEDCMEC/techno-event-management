import { describe } from 'mocha';
import { expect } from 'chai';

import organizationService from '../../src/services/organization.service';
describe('Organizations', () => {
  describe('Add new organization', () => {
    it('should return an object of newly created organization', async () => {
      const newOrganization = await organizationService().addNewOrganizationService();
      expect(participants).to.be.an('array');
      expect(participants).to.have.length.greaterThan(0);
    });
  });
});
