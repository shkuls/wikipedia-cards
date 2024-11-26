import Cards from "./components/Cards";
import useSummarise from "./hooks/useSummarise";
export default function Home() {
  useSummarise();
  return (
   <div className="w-full ">
      <Cards/>
   </div>
  );
}
