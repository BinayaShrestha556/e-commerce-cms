import { ApiList } from "@/components/ui/api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="pt-8">
      <Heading
        title="APIs"
        description="To connect to your frontend."
        size="text-7xl"
      />
      <div className="mt-10">
        <Heading
          title="Billboards"
          description="All apis for billboards"
          size="text-3xl"
        />
        <Separator className="my-3 bg-border/50" />
        <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
      <div className="mt-10">
        <Heading
          title="Categories"
          description="All apis for categories"
          size="text-3xl"
        />
        <Separator className="my-3 bg-border/50" />
        <ApiList entityName="categoriess" entityIdName="categoryId" />
      </div>
      <div className="mt-10">
        <Heading
          title="colors"
          description="All apis for Colors"
          size="text-3xl"
        />
        <Separator className="my-3 bg-border/50" />
        <ApiList entityName="colors" entityIdName="colorId" />
      </div>
      <div className="mt-10">
        <Heading
          title="Sizes"
          description="All apis for sizes"
          size="text-3xl"
        />
        <Separator className="my-3 bg-border/50" />
        <ApiList entityName="sizes" entityIdName="sizeId" />
      </div>
      <div className="mt-10">
        <Heading
          title="Products"
          description="All apis for products"
          size="text-3xl"
        />
        <Separator className="my-3 bg-border/50" />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </div>
  );
};

export default page;
