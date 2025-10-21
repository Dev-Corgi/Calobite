'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Client component for the back button on 404 page
 * Separated to allow server-side metadata in the main not-found page
 */
export function BackButton() {
  return (
    <Button 
      variant="ghost" 
      onClick={() => window.history.back()}
      className="text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Go Back
    </Button>
  );
}
