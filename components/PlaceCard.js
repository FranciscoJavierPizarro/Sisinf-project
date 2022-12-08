import Link from "next/link"
import { FiTrash2, FiStar, FiHeart, FiMapPin } from "react-icons/fi";
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
export default function PlaceCard({ title, likes, descp, idPlace, idCity, urlMaps, urlPhotos, autorG, autor }) {
    let { data: session } = useSession()
    const router = useRouter()
    const aux = session
    session = session?.session

    const [likeado, setLikeado] = useState(false);
    const [saved, setSaved] = useState(false);
    const [nlikes, setLikes] = useState(likes);
    let loadedAtributtes = useRef(false)
    useEffect(() => {
        async function isLiked() {
            const liked = await fetch(`/api/likes/` + idPlace + "/" + session?.user?.email,).then(res => res.json())
            setLikeado(!(liked.length === 0))

        }
        async function isSaved() {
            const saved = await fetch(`/api/savedPlaces/` +idPlace+"/"+session?.user?.email,).then(res => res.json())
            setSaved(!(saved.length === 0))
        }

        if (!loadedAtributtes.current && session != undefined) {
            isLiked();
            isSaved()
            loadedAtributtes.current = true
        }
    });


    const handleDelete = async (e, place, city) => {
        e.preventDefault()
        await fetch(`/api/places/` + place, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })
        router.push("/city/" + city)
    }

    const handleLike = async (e) => {
        e.preventDefault()
        if (likeado) {
            likes = likes - 1
            await fetch(`/api/likes/`, {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placeId: idPlace, userId: session?.user?.email })
            })
            setLikes(nlikes - 1)
        }
        else {
            likes = likes + 1
            await fetch(`/api/likes/`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placeId: idPlace, userId: session?.user?.email })
            })
            setLikes(nlikes + 1)
        }
        await fetch(`/api/places/` + idPlace, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favs: likes })
            })
        setLikeado(!likeado)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (saved) {
            await fetch(`/api/savedPlaces/`, {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placeId: idPlace, userId: session?.user?.email })
            })
        }
        else {
            await fetch(`/api/savedPlaces/`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ placeId: idPlace, userId: session?.user?.email })
            })
        }
        setSaved(!saved)
    }


    function corazon(likeado) {
        if (likeado) {
            return <>
                <FiHeart className={"ml-1.5 h-6 w-6 text-red-600 fill-red-500"} />
            </>;
        }
        return <>
            <FiHeart className={"ml-1.5 h-6 w-6 text-red-600 fill-transparent"} /></>;
    }

    function guardado(saved) {
        if (saved) {
            return <>
                <FiStar className={"ml-2 h-6 w-6 text-yellow-500 fill-yellow-400"} />
            </>;
        }
        return <>
            <FiStar className={"ml-2 h-6 w-6 text-yellow-500 fill-transparent"} /></>;
    }
    
    return (
        
        <Link href={"/place/" + idPlace} className="hover:cursor-pointer">
            <div className="bg-white  shadow-lg hover:shadow-2xl flex text-black mx-auto mt-8 w-5/12 h-44 shadow-lg rounded-2xl hover:cursor-pointer">
                <div className="w-28 h-28 mt-6 ml-8 rounded-2xl">
                    <img src={urlPhotos} className="mx-auto w-28 h-28" />
                </div>
                <div className="ml-8 w-2/3 h-2/3 align-right">
                    <div className="flex mr-4 mt-3 justify-end text-right">
                        {session && <>
                            {(session?.user?.email === autorG || session?.user?.image === true) && <button className="ml-2 text-gray-500" onClick={(e) => { handleDelete(e, idPlace, idCity) }}>
                                <FiTrash2 />
                            </button>}
                            <button onClick={(e) => {
                                handleSave(e, idPlace, session)
                            }}>
                                {guardado(saved)}
                            </button>
                            <button onClick={(e) => {
                                handleLike(e)
                            }}>
                                {corazon(likeado)}
                            </button>


                            {/* mover la cantidad de likes de sitio */}
                            <sub className="mt-3 text-gray-500">
                                {nlikes}
                            </sub>
                        </>}
                    </div>
                    <div className="mt-1 flex w-full">
                    <div className="uppercase flex text-xl w-auto align-left font-semibold">
                        {title}
                        </div>

                        {!(urlMaps === "") && <Link href={urlMaps} className="hover:cursor-pointer">
                            <FiMapPin className="ml-4 mr-2 flex w-10 text-red-400 hover:cursor-pointer" />
                        </Link>}
                    
                    </div>
                    <div className="text-black text-left text-base w-full">
                        {descp}
                    </div>
                </div>
            </div>
        </Link>
        
    )
}