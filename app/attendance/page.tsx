import Breadcrumbs from "@/components/Breadcrumbs";
import { DataTableDemo } from "@/components/DataTable";
import Image from "next/image";

export default function Attendance() {
  return (
    <div className="">
       <Breadcrumbs link={'attendance'} title="Attendance"/>
        <DataTableDemo/>
    </div>
  );
}
