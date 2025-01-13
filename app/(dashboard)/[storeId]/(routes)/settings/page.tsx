import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import { useServerUser } from "@/hooks/use-server-user";

interface settings {
  params: {
    storeId: string;
  };
}
const Settings = async ({ params }: settings) => {
     const user =await useServerUser();
      const userId=user?.id
  if (!userId) redirect("/sign-in");
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex flex-col p-3">
      <SettingsForm initialData={store}/>
    </div>
  );
};
export default Settings;
