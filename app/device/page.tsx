import Breadcrumbs from "@/components/Breadcrumbs";
import { DataTableDemo } from "@/components/DataTable";

import Image from "next/image";

export default function Device() {
  return (
    <div className="">
        <Breadcrumbs link={'device'}  title="Device"/>
        <DataTableDemo/>
    </div>
  );
}
