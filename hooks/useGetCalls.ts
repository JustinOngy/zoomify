import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isCallLoading, setIsCallLoading] = useState(false);

  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsCallLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  const recordings = calls.filter(
    ({ state: { recording } }: Call) => recording
  );

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isCallLoading,
  };
};
