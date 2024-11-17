import { useQuery } from 'react-query';
// import useRequests from './useRequests'; // Import your custom useRequests hook
import { useRequests } from './useRequests';
import { useMutation, useQueryClient } from 'react-query';
const useWrapper = () => {
  const queryClient = useQueryClient(); // React Query client instance
  const useGetQuery = (key, endpoint, headers = {}, options = {}, setState = (value)=>{}) => {
    const { get } = useRequests();
    return useQuery(
      key, // Unique query key
      () => get(endpoint, headers), // Function to fetch data
      // options, // React Query options like staleTime, refetchOnWindowFocus, etc.
      {
        ...options,
        onSuccess: (response) => {
          if (response.status == 200) {
            setState(response);
            queryClient.setQueryData(endpoint, response);
          }
        },
      },
    );
  };

  const useMutationWrapper = (method, endpoint, headers = {}, options = {}) => {
    // const queryClient = useQueryClient();
    const { post, put, del } = useRequests();

    const mutationFn = {
      post,
      put,
      delete: del,
    }[method];

    return useMutation((body) => mutationFn(endpoint, headers, body), {
      ...options,
      onSuccess: (data, variables, context) => {
        const keysToInvalidate = options?.invalidateKeys || [];

        if (options?.invalidateDelay) {
          setTimeout(() => {
            keysToInvalidate.forEach((key) => queryClient.invalidateQueries(key));
          }, options.invalidateDelay);
        } else {
          keysToInvalidate.forEach((key) => queryClient.invalidateQueries(key));
        }

        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    });
  };

  const usePostMutation = (endpoint, headers = {}, options = {}) => {
    return useMutationWrapper('post', endpoint, headers, options);
  };

  const usePutMutation = (endpoint, headers = {}, options = {}) => {
    return useMutationWrapper('put', endpoint, headers, options);
  };

  const useDeleteMutation = (endpoint, headers = {}, options = {}) => {
    return useMutationWrapper('delete', endpoint, headers, options);
  };

  return { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation };
};

export default useWrapper;
