import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';

export default function HandleDeleteJob() {

    const queryClient = useQueryClient();

    const {mutate: deleteJob, isPending: isDeleting, isError, error} = useMutation({
        mutationFn: async (jobId) => {
            const response = await fetch(`/api/job/delete/${jobId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete job');
            }
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Job deleted successfully');
            queryClient.invalidateQueries(['jobs']);
        },
        onError: (error) => {
            toast.error('Failed to delete job: ' + error.message);
        },
    })
  return (
    {deleteJob, isDeleting, isError, error}
  )
}
