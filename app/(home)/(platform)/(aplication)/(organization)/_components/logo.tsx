
"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@clerk/clerk-react';

const Logo = () => {

   const {userId, orgId} = useAuth()

  return (
     <>
             <Link href={`/organization/${orgId}`}>
               <Image
                 src="/img/Logo.png"
                 alt="PAW Logo"
                 width={110}
                 height={32}
                 className="h-8 w-auto object-cover"
               />
             </Link></>
  )
}

export default Logo