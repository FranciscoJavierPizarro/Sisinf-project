import Link from "next/link"
import { FiTrash2,FiStar,FiHeart,FiMapPin } from "react-icons/fi";
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
export default function PlaceCard({title,likes,descp,idPlace,idCity,urlMaps,urlImg,urlCity}) {
    const { data: session } = useSession()
    const [likeado, setLikeado] = useState(false);
    const [nlikes, setLikes] = useState(likes);
    const handleDelete= async (e,place,city) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/api/places/` + place, {
          method: "delete",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify("")
        })
        location.href = "http://localhost:3000/" + city
    }
    const isLiked = async (idPlace, session) => {
        const liked = await fetch(`http://localhost:3000/api/likes/` +idPlace+"/"+session.user.email,).then(res => res.json())
        return (liked.length != 0)
    }

    const handleLike = async(e,idPlace,session,likeso) => {
        e.preventDefault()
        const alreadyLiked = await isLiked(idPlace,session)
        if(alreadyLiked) {
            await fetch(`http://localhost:3000/api/places/` + idPlace, {
              method: "put",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify({favs:(likes-1)})
            })
            await fetch(`http://localhost:3000/api/likes/`, {
              method: "delete",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify({placeId:idPlace,userId:session.user.email})
            })
        }
        else {
            await fetch(`http://localhost:3000/api/places/` + idPlace, {
              method: "put",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify({favs:(likes+1)})
            })
            await fetch(`http://localhost:3000/api/likes/`, {
              method: "post",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify({placeId:idPlace,userId:session.user.email})
            })
        }
    }

    function corazon(Likeado) {
        if (likeado) {
            return <>
            <FiHeart className={"ml-1.5 h-6 w-6 text-red-600 fill-red-500"}/>
            </>;
          }
          return <>
          <FiHeart className={"ml-1.5 h-6 w-6 text-red-600 fill-transparent"}/></>;
    }

    return (
        <>
        <div className="flex text-black mx-auto mt-8 bg-gray-200 w-2/3 h-40 rounded-2xl border-2 border-gray-600">
           <div className="bg-gray-400 w-1/6 h-24 mt-8 ml-8 rounded-2xl">
                <img src={"https://i.pinimg.com/564x/05/9e/4e/059e4ebb4a8f8b7753f66ff3333672ec.jpg"} className="mx-auto w-24 h-24 object-fill"/>
           </div>
           <div className="ml-16  w-5/6 h-full align-right">
                <div className="flex mr-4 mt-4 justify-end text-right">
                    {session && <><button className="ml-2 text-gray-500" onClick={(e) => {handleDelete(e,idPlace,idCity)}}>
                        <FiTrash2/>
                    </button>
                    <FiStar className="ml-2 h-6 w-6 text-yellow-500"/>
                    <button onClick={(e) => {setLikeado(!likeado)
                        setLikes(nlikes + (likeado? -1:1))
                        handleLike(e,idPlace,session,likes)}}>
                        {corazon(likeado)}
                    </button>
                    {/* mover la cantidad de likes de sitio */}
                    <sub className="ml-0 mt-3 text-gray-500">
                        {nlikes}
                    </sub>
                    </>}
                </div>
                <div className="flex w-full align-left font-semibold">
                    {/* <Link href={urlCity}> */}
                        {title}
                    {/* </Link> */}
                    <FiMapPin className="ml-8 text-red-400"/>
                                  
                </div>
                <div className="text-black text-left">
                    {descp}
                </div>
        </div>
        </div>
        </>
    )
}