import React, { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import "./App.css"


export default function ReadMe(props) {
    return (
        <div className='App'>
            <p>3D Kadaster is a project by Bugra Kaya, Damla Ural and Radu Apsan.
                Due to the fact that React sometimes struggles with loading 
                big 3D objects it can take a couple seconds for the program to load.
                You may have to restart the program or double click on the object links
                in order to view the objects. 
            </p>
        </div>
    )
}
