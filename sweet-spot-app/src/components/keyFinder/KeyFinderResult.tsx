import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function KeyFinderResult() {
  console.log("key finder results has entered the chat");
  return (
    <div className="w-full h-full flex items-center">
      {/* <h1>here is some initial information</h1> */}
      <Card className="w-3/5 h-5/6 bg-slate-100 border-black">
        <CardHeader>
          <CardTitle className="text-center">Insert Song Title Here</CardTitle>
          <CardDescription className="text-center">
            Insert Artist Name | CCLI: 1234576
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p>Recommended Key for [insert name] is:</p>
            {/* <div>
              <span className="bg-orange-500 text-2xl text-white p-8">B</span>
            </div> */}
            <div className="bg-orange-400 text-2xl font-bold text-white p-0 px-1 max-w-fit rounded-sm">
              B
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
