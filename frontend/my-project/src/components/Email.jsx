import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Email({ title }) {
  const [showUnread, setShowUnread] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild className="text-2xl">
        <Button variant="outline bg-slate-800">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-5 mb-2">{title} Inbox</DialogTitle>
          <DialogDescription className="flex flex-row gap-x-4">
            <Button onClick={() => setShowUnread(true)}>Unread (0)</Button>
            <Button onClick={() => setShowUnread(false)}>Read (0)</Button>
          </DialogDescription>
        </DialogHeader>
        <div>
          {showUnread ? (
            <div>
              <p>You have no unread messages</p>
            </div>
          ) : (
            <div>
              <p>You have no read messages</p>
            </div>
          )}
        </div>
        <DialogClose asChild className=''>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
