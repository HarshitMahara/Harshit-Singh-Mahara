import React from "react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-shadow-grey-2 bg-background">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Harshit Singh Mahara. All rights reserved.</p>
      </div>
    </footer>
  );
}
