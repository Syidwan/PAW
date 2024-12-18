import Image from 'next/image'
import React from 'react'

const Board = () => {
  return (
    <div
      className="bg-cover bg-center h-40 shadow-md relative"
      style={{ backgroundImage: "url('/img/bgproject.png')" }} // Menggunakan background image
    >
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <h2 className="text-white text-lg font-bold absolute top-2 left-2">My Project 1</h2>
      </div>
      <Image
        src="/img/partisipasi.png" // Pastikan path dimulai dengan "/img/" tanpa public
        alt="Type"
        className="absolute bottom-2 left-2 w-6 h-6"
        width={24} 
        height={24} 
      />
    </div>
  )
}

export default Board
