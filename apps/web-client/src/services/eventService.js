import axiosInstance from '@/lib/axios';

export const fetchAllEvents = async ({ organizationId }) => {
  try {
    const { data, error } = await axiosInstance.get(`/core/${organizationId}/events`);

    return data?.events;
  } catch (err) {
    console.error(err);
  }
};
