"use client";
import { Store } from "@prisma/client";
import { Popover, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="select a store"
          className={cn("w-[200px] justify-between")}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
        {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]  p-0">
        <Command >
          <CommandList>
            <CommandInput placeholder="search store..." />
            <CommandEmpty>no store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem onSelect={()=>onStoreSelect(store)} key={store.value}>
                  <StoreIcon className="mr-2 h-4 w-4"/>{store.label}
                  <Check className={cn("ml-auto h-4 w-4 ", currentStore?.value===store.value?"opacity-100":"opacity-0")}/>
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={()=>{
                setOpen(false);
                storeModal.onOpen();
              }}>
                <PlusCircle className="mr-2 h-2 w-5"/>
                create store
              </CommandItem>
            </CommandGroup>
          </CommandList>

        
          
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StoreSwitcher;
