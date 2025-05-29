
import React from 'react'
import { useMutation } from "@tanstack/react-query"

export default function HandleApply() {
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
            alert("Job Applied!");
        }
    })
  return ({applyJob, isApplying, error, isError} )
}
