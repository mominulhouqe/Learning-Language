import { useEffect, useState } from "react"

const useInstructor = () => {
    const [instructors, setInstructors] = useState([]);
const {user} = useState()
console.log(instructors);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://server-pi-liart.vercel.app/users/instructor-emails`)
            .then(res => res.json())
            .then(data => {
                setInstructors(data)
                setLoading(false)
            
            })
    }, [])

    return [instructors, loading]

}


export default useInstructor;
