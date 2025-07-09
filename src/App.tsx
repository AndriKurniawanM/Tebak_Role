import {useState} from "react";

type Scores = Record<"developer" | "designer" | "manager", number>;

function calRole (sizeKB: number, w: number, h: number){
  const scores: Scores = {developer:0, designer:0, manager:0};
  if (sizeKB <50) scores.developer += 3;
  else if (sizeKB < 200) scores.designer += 3;
  else scores.manager += 3;

  const mp = (w*h)/1_000_000;
  if (mp < 1) scores.developer += 2;
  else if (mp < 3) scores.designer += 2;
  else scores.manager += 2;

  const role = (Object.keys(scores) as (keyof Scores) [])
    .reduce((best,key)=> scores[key] > scores[best] ? key : best, "developer");
  return { role, scores };
}

export default function App(){
  const [username, setUsername] = useState("");
  const [file, setFile]         = useState<File|null>(null);
  const [result, setResult]     = useState<{role:String;scores:Scores}|null>(null);

  const handleFile = (f:File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const sizeKB = f.size/1024;
        setResult(calRole(sizeKB, img.width, img.height));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(f);
  };

   const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) handleFile(file);
   };
   
   if (result){
    return (
      <div className ="p-6 text-center">
        <h1 className ="text-2xl"> Halo, {username}!</h1>
        <p className="mt-4"> Role-mu adalah <strong> {result.role}</strong>.</p>
        <pre className="mt-2">{JSON.stringify(result.scores, null,2)}</pre>
      </div>
    );
   }
   return ( 
    <form onSubmit={onSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <div>
        <label> Nama: </label>
        <input
          type="text" required
          className="border p-2 w-full"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          />
      </div>
      <div>
        <label> Upload Foto:</label>
        <input
        type="file" accept="image/*" required
        onChange={e=> e.target.files&&setFile(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Hitung Role
        </button>
    </form>
   );
}