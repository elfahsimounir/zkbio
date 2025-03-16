"use client"
import Breadcrumbs from "@/components/Breadcrumbs";
import TestC from "@/components/testC";
import { BarCharts } from "@/components/ui/barChart";
import { PieCharts } from "@/components/ui/pieChart";
import Image from "next/image";
import { toast } from "sonner"

export default function Home() {

  return (
    <div >
        <Breadcrumbs title={null} link={null} />
        {/* <div className="grid grid-cols-2 gap-3">
        <PieCharts/>
        <BarCharts/>
        </div> */}
        <TestC  />
        {/* <button onClick={()=>{toast('hello')}}>hh</button> */}
    </div>
  );
}
