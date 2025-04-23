'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Check, Flag, RotateCcw, Trash } from 'lucide-react';
import { updateTestimonialStatus, deleteTestimonial } from '../actions';
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface TableActionsProps {
  testimonialId: string;
  currentStatus: 'APPROVED' | 'FLAGGED' | 'PENDING';
}

export function TableActions({ testimonialId, currentStatus }: TableActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusChange = async (status: 'APPROVED' | 'FLAGGED' | 'PENDING') => {
    if (status === currentStatus) return;
    
    setIsLoading(true);
    try {
      await updateTestimonialStatus(testimonialId, status);
      toast.success('Status updated', {
        description: `Testimonial status updated to ${status.toLowerCase()}.`,
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Error', {
        description: 'Failed to update testimonial status. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteTestimonial(testimonialId);
      toast.success('Testimonial deleted', {
        description: 'The testimonial has been permanently deleted.',
      });
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      toast.error('Error', {
        description: 'Failed to delete testimonial. Please try again.',
      });
    } finally {
      setIsDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
          {currentStatus !== "APPROVED" && (
            <DropdownMenuItem
              onClick={() => handleStatusChange("APPROVED")}
              disabled={isLoading}
            >
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Approve
            </DropdownMenuItem>
          )}
          
          {currentStatus !== "FLAGGED" && (
            <DropdownMenuItem
              onClick={() => handleStatusChange("FLAGGED")}
              disabled={isLoading}
            >
              <Flag className="mr-2 h-4 w-4 text-amber-500" />
              Flag
            </DropdownMenuItem>
          )}
          
          {currentStatus !== "PENDING" && (
            <DropdownMenuItem
              onClick={() => handleStatusChange("PENDING")}
              disabled={isLoading}
            >
              <RotateCcw className="mr-2 h-4 w-4 text-blue-500" />
              Set to Pending
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleteLoading}
            className="text-red-600 focus:text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 