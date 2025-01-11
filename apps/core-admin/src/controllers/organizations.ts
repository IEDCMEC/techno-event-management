import { Request, Response } from 'express';

import prisma from '../utils/database';

export const createNewOrganization = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;
    const { id, name } = req.body;
    //console.log(id, name);
    const newOrganization = await prisma.organization.create({
      data: {
        id,
        name,
        OrganizationUser: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    });

    if (!newOrganization) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json(newOrganization);
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Organization with the same id already exists' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getOrganizationStats = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.orgId;

    let organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        Event: true,
        Address: true,
        OrganizationUser: true,
      },
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    //console.log(organization.addressId !== null);
    if (organization.addressId !== null) {
      let address = await prisma.Address.findUnique({
        where: {
          id: organization.addressId,
        },
      });
      organization = {
        id: organization.id,
        name: organization.name,
        createdAt: organization.createdAt,
        numberOfEvents: organization.Event.length,
        numberOfMembers: organization.OrganizationUser.length,
        addressData: address,
      };
      return res.status(200).json({ organization });
    } else {
      organization = {
        id: organization.id,
        name: organization.name,
        createdAt: organization.createdAt,
        numberOfEvents: organization.Event.length,
        numberOfMembers: organization.OrganizationUser.length,
      };
      return res.status(200).json({ organization });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getUsersOrganizations = async (req: Request, res: Response) => {
  try {
    const userId = req?.auth?.payload?.sub;

    let organizations = await prisma.organization.findMany({
      where: {
        OrganizationUser: {
          some: {
            userId,
          },
        },
      },
      include: {
        Event: true,
      },
    });

    const updatedOrganizations = await Promise.all(
      organizations.map(async (organization: any) => {
        //console.log(organization.addressId !== null);
        if (organization.addressId !== null) {
          let address = await prisma.Address.findUnique({
            where: {
              id: organization.addressId,
            },
          });
          const data = {
            ...organization,
            addressData: address,
          };
          return data;
        } else {
          return organization;
        }
      }),
    );
    return res.status(200).json({ organizations: updatedOrganizations });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getOrganizationMembers = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.orgId;

    let organizationUsers = await prisma.organizationUser.findMany({
      where: {
        organizationId,
      },
      include: {
        user: true,
      },
    });

    organizationUsers = organizationUsers.map((organizationUser: any) => ({
      id: organizationUser.id,
      role: organizationUser.role,
      addedAt: organizationUser.createdAt,
      organizationId: organizationUser.organizationId,
      firstName: organizationUser.user.firstName,
      lastName: organizationUser.user.lastName,
      email: organizationUser.user.email,
    }));

    return res.status(200).json({ organizationUsers });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const addOrganizationMember = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.orgId;

    const { email, role } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.id;

    const organizationUserExists = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (organizationUserExists) {
      return res.status(400).json({ error: 'User is already a member of this organization' });
    }

    const newOrganizationUser = await prisma.organizationUser.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });

    if (!newOrganizationUser) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    return res.status(200).json({ newOrganizationUser });
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'User is already a member of this organization' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
export const updateOrganizationDetails = async (req: Request, res: Response) => {
  //console.log('Hello world');
  try {
    const {
      orgId,
      name,
      description,
      logo,
      tagline,
      email,
      linkedInLink,
      instagramLink,
      phoneNo,
      twitter,
      website,
      addressDetails, // Contains address fields: name, city, state, country, pincode, locationUrl
    } = req.body;

    if (
      !orgId ||
      !email ||
      !phoneNo ||
      !name ||
      !website ||
      !addressDetails?.city ||
      !addressDetails?.state ||
      !addressDetails?.country ||
      !addressDetails?.pincode
    ) {
      // //console.log(req.body);
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found.' });
    }

    let addressId = organization.addressId;
    let updatedAddress = [];
    if (addressId) {
      updatedAddress = await prisma.address.update({
        where: { id: addressId },
        data: {
          name: addressDetails.name || '',
          city: addressDetails.city,
          state: addressDetails.state,
          country: addressDetails.country,
          pinCode: parseInt(addressDetails.pincode),
          locationUrl: addressDetails.locationUrl || '',
        },
      });
    } else {
      updatedAddress = await prisma.address.create({
        data: {
          name: addressDetails.name || '',
          city: addressDetails.city,
          state: addressDetails.state,
          country: addressDetails.country,
          pinCode: parseInt(addressDetails.pincode),
          locationUrl: addressDetails.locationUrl || '',
        },
      });
      addressId = updatedAddress.id;
    }

    const updatedDetails = await prisma.organization.update({
      where: { id: orgId },
      data: {
        name,
        Description: description,
        Logo: logo,
        Tagline: tagline,
        email,
        linkedInLink,
        instagramLink,
        phoneNo,
        twitterLink: twitter,
        website,
        addressId,
      },
    });

    return res.status(200).json({
      message: 'Organization details updated successfully.',
      newDetails: { addressData: updatedAddress, ...updatedDetails },
    });
  } catch (error) {
    console.error('Error updating organization details:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
