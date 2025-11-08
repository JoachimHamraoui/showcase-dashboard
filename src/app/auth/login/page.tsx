import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInTab } from "./_components/sign-in-tab";
import { SignUpTab } from "./_components/sign-up-tab";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-1 justify-center items-center">
        <Tabs defaultValue="signin" className="mx-auto w-[500px] my-6 px-4">
      <TabsList>
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <Card>
        <TabsContent value="signin">
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign in</CardTitle>
            <CardContent>
              <SignInTab />
            </CardContent>
          </CardHeader>
        </TabsContent>
        <TabsContent value="signup">
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign up</CardTitle>
            <CardContent>
              <SignUpTab />
            </CardContent>
          </CardHeader>
        </TabsContent>
      </Card>
    </Tabs>
    </div>
  );
}
