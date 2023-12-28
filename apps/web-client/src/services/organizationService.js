import axiosInstance from '@/lib/axios';

export const fetchAllOrganizations = async () => {
  try {
    const { data, error } = await axiosInstance.get('/users/organizations');

    return data?.organizations;
  } catch (err) {
    console.error(err);
  }
};
