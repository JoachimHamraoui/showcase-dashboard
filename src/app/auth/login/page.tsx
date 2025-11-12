import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInTab } from "./_components/sign-in-tab";
import { SignUpTab } from "./_components/sign-up-tab";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "./_components/social-auth-buttons";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-1 justify-center items-center">
      <Tabs defaultValue="signin" className="mx-auto w-[500px] my-6 px-4">
        <TabsList>
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <SignInTab />
            </CardContent>
            <Separator />
            <CardFooter>
              <SocialAuthButtons />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Sign up</CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpTab />
            </CardContent>
            <Separator />
            <CardFooter>
              <SocialAuthButtons />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
