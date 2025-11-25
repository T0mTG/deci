import Image from "next/image";
import NavButton from "./ui/navButton";
import AddRow from "./ui/addRow";
import TableDisp from "./ui/table";
import TableDispVert from "./ui/table_vert";
import { title } from "process";
import { PyCom } from "./ui/test_com";

export default function Home() {
  return (
    <div>
        <div className="flex bg-gray-950 w-full relative h-14 items-center justify-center pl-5 pr-5">
          <div className="relative inline-flex text-pink-100 text-2xl font-semibold"> Not A Title</div>
          <div className="pl-10 right-0 ml-auto items-center gap-5 flex">
              <NavButton title={"Dashboard"}/>
              <NavButton title={"About"}/>
              <NavButton title={"Sign in"}/>
          </div>  
        </div>
        <TableDispVert></TableDispVert>
        {/* <PyCom></PyCom> */}
    </div>
  );
}
