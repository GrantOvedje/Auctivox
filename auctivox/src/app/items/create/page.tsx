import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/date-picker";
import { createItemAction } from "./actions";
// import { useState } from "react";

export default function CreatePage() {
  //  const [date, setDate] = useState<Date>(new Date());

  return (
   <main className="space-y-8">
    <h1 className="text-4xl font-bold">Post an Item</h1>
    <form
      className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
      action = {createItemAction}
      // encType="multipart/form-data" // 🔑 required for file uploads
    >
      <Input required className="max-w-lg" name="name" placeholder="Name your item" />
      <Input required className="max-w-lg" name="startingPrice" type="number" step="0.01" placeholder="The price to start the auction" />
      <Input required className="max-w-lg" type="file" name="image" accept="image/*" />
      <DatePickerDemo name="endDate" />
      <Button className="self-end" type="submit">Post Item</Button>
    </form>
   </main>
  );
}


// date={date} setDate={setDate} 



// "use client";
// import { useState } from "react";

// export default function UploadForm() {
//   const [imageUrl, setImageUrl] = useState("");

//   async function handleUpload(e) {
//     e.preventDefault();
//     const file = e.target.file.files[0];

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.url) {
//       setImageUrl(data.url);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" name="file" accept="image/*" />
//         <button type="submit">Upload</button>
//       </form>

//       {imageUrl && (
//         <div>
//           <p>Uploaded Image:</p>
//           <img src={imageUrl} alt="Auction item" width="200" />
//         </div>
//       )}
//     </div>
//   );
// }
