import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { signIn } from 'next-auth/react';
export default function AddCity() {
    
  const { data: session } = useSession()
 
//...
const handleSubmit = async (e) => {
        e.preventDefault();
        //Getting value from useRef()
        // const gmail = gmailRef.current.value;
        // const password = passwordRef.current.value;
        // //Validation
        // if (!gmail || !gmail.includes('@') || !password) {
        //     alert('Invalid details');
        //     return;
        // }
        //POST form values
        const res = await fetch('/api/log/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                gmail: "zzzzz",
                password: "a",
                name: "AAAAAAAA",
                surname:  "BBBBBBBBBb"
            }),
        });
        //Await for data for any desirable next steps
        const data = await res.json();
        console.log(data);
    };
  
    return (
      <>
      <div className="flex justify-center">
        
      <form
      method="post"
      onSubmit={(e) => {
        handleSubmit(e,session)
      }}
      className="mt-4"
      >
      <div className="grid justify-items-center gap-x-2 mt-1 mb-10">
        <label type="name" className="block w-full">
          <span className="text-2xl self-auto text-black">Añadir una ciudad/pueblo</span>
  
        </label>
      </div>
      <div className="flex gap-x-2 mt-1">
        <label type="name" className="block w-full">
          <span className="text-sm self-auto text-black">Añadir nombre de ciudad:</span>
          <input
            type="name"
            id="name"
            name="name"
            autoComplete="name"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
      </div>
      <div className="flex gap-x-2 mt-1">
        <label className="block w-full">
          <span className="text-sm self-auto text-black">Añadir URl de Google Maps:</span>
          <input
            type="maps"
            id="maps"
            name="maps"
            autoComplete="maps"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
          />
        </label>
      </div>
      <div className="flex gap-x-2 mt-1">
        <label className="block w-full">
          <span className="text-sm self-auto text-black">Añadir URL foto:</span>
          <input
            type="photo"
            id="photo"
            name="photo"
            autoComplete="photo"
            className="block w-full px-3 py-2 mt-1 text-black border rounded-md form-input focus:border-blue-600 bg-transparent"
            required
            />
        </label>
      </div>
      <div className="gap-x-2 mt-2">
        <span className="text-sm text-black">Añadir descripción del sitio:</span>
          <textarea id="descp" rows="4" class="block p-2.5 mb-5 bg-gray-300 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-white-400 text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Añadir descripción..."></textarea>
      </div>
            
             
      <button
              type="submit"
              className="capitalize mt-4 w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-gray-300 rounded-md hover:bg-blue-200"
              >
              Añadir
            </button>
      </form>
      </div>
      </>
    );
  }

  AddCity.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
  }