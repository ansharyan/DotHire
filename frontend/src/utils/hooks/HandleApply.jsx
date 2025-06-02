
import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

export default function HandleApply() {
    const queryClient = useQueryClient();
    const {mutate:applyJob, isPending:isApplying, error, isError} = useMutation({
        mutationFn: async ({jobId, applicantId}) => {
            const response = await fetch(`/api/application/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobId, applicantId }),
            });
            const data = response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to apply for the job');
            }
            return data;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['jobs']});
            toast.success("Job Applied!");
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to apply for the job');
        },
    })
  return ({applyJob, isApplying, error, isError} )
}
