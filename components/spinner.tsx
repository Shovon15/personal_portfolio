import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
type Props = {}

const Spinner = (props: Props) => {
    return (
        <ClipLoader
            color="#5be6aa"
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Spinner