"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SocialAuthButtons() {
    return (
        <div className="flex gap-2">
            <Button onClick={() => {
                authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                });
            }} className="w-full">Google</Button>
        </div>
    );
}