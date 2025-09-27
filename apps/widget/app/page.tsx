"use client";
import { Button } from "@workspace/ui/components/button";
import { api } from "@workspace/backend/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello App/widget</h1>
        <div className="max-w-sm w-full mx-auto">
          {users && users.map((user) => <p key={user._id}>{user.name}</p>)}
        </div>
        <Button size="sm" onClick={() => addUser()}>
          Add User
        </Button>
      </div>
    </div>
  );
}
