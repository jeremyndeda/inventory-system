import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

   export default function Home() {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
         <Card className="w-full max-w-md">
           <CardHeader>
             <CardTitle className="text-2xl text-center">Mizizi Inventory System</CardTitle>
           </CardHeader>
           <CardContent className="text-center">
             <SignedIn>
               <p className="mb-4">You are signed in!</p>
               <Button asChild>
                 <a href="/dashboard">Go to Dashboard</a>
               </Button>
             </SignedIn>
             <SignedOut>
               <p className="mb-4">Please sign in to continue.</p>
               <SignInButton mode="modal">
                 <Button>Sign In</Button>
               </SignInButton>
             </SignedOut>
           </CardContent>
         </Card>
       </div>
     );
   }