import { Input } from "@nextui-org/input";
import DropDown from "./dropDown";

export default function SearchBox(props: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type=" text"
          placeholder="Search in Table"
          startContent={<DropDown getTableName={props.getTableName}></DropDown>}
        />
      </div>
    </div>
  );
}
