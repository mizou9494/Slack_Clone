import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen grid place-content-center">
      <h1 className="text-3xl text-rose-600 font-bold flex items-center justify-center">This is the Home Page <Button variant="slack">Button</Button> </h1>
    </div>
  )
}
